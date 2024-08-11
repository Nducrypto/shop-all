import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as chatAction from '../../../actions/chatActions';
import * as chatState from '../../../hook/useChat';
import {useUserState} from '../../../hook/useUsers';
import {useSnackBarState} from '../../../hook/useSnackbar';
import {Message} from '../../../hook/useChat';
import Entypo from 'react-native-vector-icons/Entypo';

import moment from 'moment';
import {screenNames, NavigationProps} from '../../../screen';
import {useNavigation} from '@react-navigation/native';
import {chatStyles} from './chatStyles';
import themes from '../../../config/themes';

const Chat = () => {
  chatAction.fetchAllChat();
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef<ScrollView | null>(null);
  const navigation = useNavigation<NavigationProps>();

  const {setSnackBar} = useSnackBarState();
  const {currentUser} = useUserState();
  const {allChat} = chatState.useAllChatState();

  const uniqueDialogues: chatState.Message[] = chatState.customerSpecificChat(
    currentUser?.userId || '',
    allChat,
  );
  const extractUnreadMessage = chatState.messageNotificationForCustomer(
    currentUser?.userId || '',
    allChat,
  );

  const unreadLength = extractUnreadMessage.length;

  const handleUpdateUnread = () => {
    chatAction.updateUnreadMessage(extractUnreadMessage);
  };

  useEffect(() => {
    if (unreadLength > 0) {
      handleUpdateUnread();
    }
  }, [unreadLength]);

  useEffect(() => {
    const scrollToBottom = () => {
      scrollViewRef?.current?.scrollToEnd({animated: false});
    };
    scrollToBottom();
  }, [uniqueDialogues]);

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      return;
    }

    const messageData = {
      timestamp: new Date().getTime(),
      message: message,
      email: currentUser?.email,
      role: currentUser?.role,
      senderType: 'customer',
      status: 'Unread',
      customerId: currentUser?.userId,
      alignmentKey: currentUser?.userId,
      userName: currentUser?.userName,
    };
    chatAction.createMessage(messageData as Message, setSnackBar);
    setMessage('');
  };

  function isCurrentUserMessage(alignmentKey: string) {
    return alignmentKey === currentUser?.userId;
  }
  if (!currentUser?.email) {
    return (
      <View style={chatStyles.signInCon}>
        <Text
          style={chatStyles.signInText}
          onPress={() => navigation.navigate(screenNames.signIn)}>
          Please Sign in to continue
        </Text>
      </View>
    );
  }

  return (
    <View style={chatStyles.container}>
      {!uniqueDialogues.length && (
        <Text style={chatStyles.welcomeText}>
          Hello {currentUser?.userName}! 😊 How can i assist you today?
        </Text>
      )}
      <View style={chatStyles.content}>
        {currentUser?.userId ? (
          <ScrollView
            ref={scrollViewRef}
            style={chatStyles.messages}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={chatStyles.messagesContainer}>
            {uniqueDialogues.map(data => (
              <View
                key={data.chatId}
                style={{
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    ...chatStyles.avatarMessCon,
                    ...(data.alignmentKey === currentUser?.userId && {
                      justifyContent: 'flex-end',
                    }),
                  }}>
                  {!isCurrentUserMessage(data.alignmentKey) && (
                    <Image
                      source={{
                        uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
                      }}
                      style={chatStyles.avatar}
                    />
                  )}
                  <View>
                    <View
                      style={{
                        ...chatStyles.message,
                        ...(isCurrentUserMessage(data.alignmentKey) && {
                          backgroundColor: themes.COLORS.BUTTON_COLOR,
                          marginTop: 20,
                        }),
                      }}>
                      <Text
                        style={{
                          ...chatStyles.messageText,
                          ...(isCurrentUserMessage(data.alignmentKey) && {
                            color: themes.COLORS.WHITE,
                          }),
                        }}>
                        {data.message}
                      </Text>
                    </View>
                    <View>
                      <Text style={chatStyles.messageDate}>
                        {moment(new Date(data.timestamp).toISOString()).format(
                          'h:mm A',
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : null}

        <View style={chatStyles.messageInput}>
          <TouchableOpacity
            onPress={handleSendMessage}
            testID="button"
            disabled={!message}>
            <Entypo
              size={16}
              name="camera"
              style={{paddingRight: 8, color: themes.COLORS.MUTED}}
            />
          </TouchableOpacity>

          <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            placeholder="Message"
            style={chatStyles.input}
            placeholderTextColor="grey"
          />
        </View>
      </View>
    </View>
  );
};
export default Chat;
