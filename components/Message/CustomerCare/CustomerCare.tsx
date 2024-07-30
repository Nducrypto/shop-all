import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  DrawerLayoutAndroid,
  TextInput,
  Keyboard,
} from 'react-native';
import * as chatAction from '../../../actions/chatActions';
import * as chatState from '../../recoilState/chatState';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './custCareStyles';
import {useUserState} from '../../recoilState/userState';
import {useSnackBarState} from '../../recoilState/snacbarState';
// import moment from "moment";

const CustomerCare = () => {
  chatAction.fetchAllChat();
  const [message, setMessage] = useState('');
  const [optionsIsVisible, setOptionsIsVisible] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<chatState.Message[]>([]);

  const drawerPosition = 'left';
  const drawer = useRef<any>(null);
  const {currentUser} = useUserState();
  const {setSnackBar} = useSnackBarState();
  const {allChat} = chatState.useAllChatState();

  // const { isVibrationEnabled } = useSelector((state) => state.chats);
  const uniqueDialogues = chatState.customerSpecificChat(
    selectedUser[0]?.customerId,
    allChat,
  );

  const userSelection: any = chatState.customerAssistHub();

  async function handleReplyCustomer() {
    if (message.trim() === '') {
      return;
    }
    const data = {
      timestamp: new Date().getTime(),
      message: message || '',
      email: selectedUser.length > 0 ? selectedUser[0]?.email : '',
      role: currentUser?.role || '',
      senderType: 'customer-service' || '',
      status: 'Unread' || '',
      customerId: selectedUser.length > 0 ? selectedUser[0]?.customerId : '',
      alignmentKey: currentUser?.userId || '',
    };
    Keyboard.dismiss();

    setMessage('');
    chatAction.createMessage(data as chatState.Message, setSnackBar);
  }

  function handleUserSelect(
    array: chatState.Message[],
    unreadMessages: chatState.Message[],
  ) {
    setSelectedUser(array);

    if (unreadMessages.length > 0) {
      chatAction.updateUnreadMessage(array);
    }
  }

  function getUnreadUserMessages(messages: chatState.Message[]) {
    const filteredUnreadUserMessages = messages.filter(
      item => item.status === 'Unread' && item.role !== 'Admin',
    );
    return filteredUnreadUserMessages.length > 0
      ? filteredUnreadUserMessages
      : [];
  }
  function handleDeleteChat(chatId: string) {
    chatAction.deleteChat(chatId, setSnackBar);
  }
  const handleCloseDrawer = () => {
    drawer?.current?.closeDrawer();
  };

  const navigationView = () => {
    return (
      <View>
        {currentUser?.role === 'Admin' && (
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {userSelection.map(([conversationId, messagesData]: any) => {
                const unreadMessages = getUnreadUserMessages(messagesData);
                return (
                  <TouchableOpacity
                    key={conversationId}
                    style={
                      selectedUser.length > 0 &&
                      selectedUser[0]?.customerId ===
                        messagesData[0]?.customerId
                        ? styles.selected
                        : styles.notSelected
                    }
                    onPress={() => {
                      handleUserSelect(messagesData, unreadMessages);

                      handleCloseDrawer();
                    }}>
                    <Text style={styles.email}>{messagesData[0]?.email}</Text>
                    <Text>{unreadMessages?.length}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      ref={drawer}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {' '}
            {selectedUser.length > 0
              ? `Chat with ${selectedUser[0].email}`
              : 'Select a user to chat'}
          </Text>
        </View>

        <View style={styles.content}>
          {selectedUser?.length > 0 && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.messages}
              contentContainerStyle={styles.messagesContainer}>
              {uniqueDialogues.map((chat: any) => (
                <View
                  key={chat.chatId}
                  style={[
                    styles.message,
                    {
                      alignSelf:
                        chat.role === 'Admin' ? 'flex-end' : 'flex-start',
                      backgroundColor:
                        chat.role === 'Admin' ? 'orangered' : 'orange',
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() =>
                      setOptionsIsVisible(prev =>
                        prev === chat.chatId ? null : chat.chatId,
                      )
                    }
                    style={{
                      alignItems:
                        chat.role === 'Admin' ? 'flex-end' : 'flex-start',
                    }}>
                    <Icon name="edit" size={15} color="white" />
                  </TouchableOpacity>

                  <Text style={styles.messageText}>{chat.message}</Text>
                  <View
                    //  ref={bottomRef}
                    style={styles.messageStatus}>
                    {/* <Text>{moment(chat?.date).format("h:mm A")}</Text> */}
                  </View>
                  {optionsIsVisible === chat.chatId && (
                    <View>
                      <Icon
                        name="trash"
                        size={20}
                        color="green"
                        onPress={() => handleDeleteChat(chat.chatId)}
                      />
                    </View>
                  )}
                </View>
              ))}
            </ScrollView>
          )}

          {selectedUser && (
            <View style={styles.messageInput}>
              <TextInput
                // ref={bottomRef}
                style={styles.input}
                value={message}
                onChangeText={text => setMessage(text)}
                placeholder="Type your message..."
              />
              <TouchableOpacity onPress={handleReplyCustomer}>
                <Text>send</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default CustomerCare;
