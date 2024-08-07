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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './custCareStyles';
import {useUserState} from '../../recoilState/userState';
import {useSnackBarState} from '../../recoilState/snacbarState';
import globalStyle from '../../../constants/globalStyle';
import moment from 'moment';

const CustomerCare = () => {
  chatAction.fetchAllChat();
  const [message, setMessage] = useState('');
  const [optionsIsVisible, setOptionsIsVisible] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<chatState.Message[]>([]);

  const drawer = useRef<any>(null);
  const {currentUser} = useUserState();
  const {setSnackBar} = useSnackBarState();
  const {allChat} = chatState.useAllChatState();

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
    return messages.filter(
      item => item.status === 'Unread' && item.role !== 'Admin',
    );
  }

  function handleDeleteChat(chatId: string) {
    chatAction.deleteChat(chatId, setSnackBar);
  }

  const handleToggleDrawer = () => {
    if (drawer.current) {
      drawer.current.openDrawer();
    }
  };

  const handleCloseDrawer = () => {
    drawer.current?.closeDrawer();
  };

  const navigationView = () => (
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
                    selectedUser[0]?.customerId === messagesData[0]?.customerId
                      ? styles.selected
                      : styles.notSelected
                  }
                  onPress={() => {
                    handleUserSelect(messagesData, unreadMessages);
                    handleCloseDrawer();
                  }}>
                  <Text style={styles.email}>
                    {messagesData[0]?.email.split('@')[0]}
                  </Text>
                  <Text>{unreadMessages.length}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );

  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      ref={drawer}
      drawerPosition="left"
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {selectedUser.length > 0
              ? `Chat with ${selectedUser[0].email.split('@')[0]}`
              : 'Select a user to chat'}
          </Text>
          <TouchableOpacity
            onPress={handleToggleDrawer}
            style={{
              width: 20,
            }}>
            <FontAwesome name="bars" size={24} color="white" />
          </TouchableOpacity>
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
                  style={{
                    ...styles.message,
                    ...(chat.role === 'Admin' && {
                      alignSelf: 'flex-end',
                      backgroundColor: globalStyle.COLORS.BUTTON_COLOR,
                    }),
                  }}>
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
                    <FontAwesome name="edit" size={15} color="red" />
                  </TouchableOpacity>

                  <Text
                    style={{
                      ...styles.messageText,
                      ...(chat.role === 'Admin' && {
                        color: 'white',
                      }),
                    }}>
                    {chat.message}
                  </Text>
                  <View style={styles.messageStatus} />
                  <View>
                    <Text style={styles.messageDate}>
                      {moment(new Date(chat.timestamp).toISOString()).format(
                        'h:mm A',
                      )}
                    </Text>
                  </View>
                  {optionsIsVisible === chat.chatId && (
                    <View>
                      <FontAwesome
                        name="trash"
                        size={15}
                        color="red"
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
              <Entypo
                onPress={handleReplyCustomer}
                testID="button"
                disabled={!message}
                size={16}
                name="camera"
                style={{paddingRight: 8, color: globalStyle.COLORS.MUTED}}
              />
              <TextInput
                value={message}
                onChangeText={text => setMessage(text)}
                placeholder="Message"
                style={styles.input}
                placeholderTextColor="grey"
              />
            </View>
          )}
        </View>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default CustomerCare;
