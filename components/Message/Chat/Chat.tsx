import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as chatAction from '../../../actions/chatActions';
import * as chatState from '../../recoilState/chatState';
import {useUserState} from '../../recoilState/userState';
import {useSnackBarState} from '../../recoilState/snacbarState';
import {Message} from '../../recoilState/chatState';
import Entypo from 'react-native-vector-icons/Entypo';
import globalStyle from '../../../constants/globalStyle';
import moment from 'moment';
import {width} from '../../../constants/utils';
import {screen, NavigationProps} from '../../../constants/screens';
import {useNavigation} from '@react-navigation/native';

const Chat = () => {
  chatAction.fetchAllChat();
  const [message, setMessage] = useState('');
  const scrollViewRef = useRef<any>();
  const navigation = useNavigation<NavigationProps>();

  const {setSnackBar} = useSnackBarState();
  const {currentUser} = useUserState();
  const {allChat} = chatState.useAllChatState();
  const uniqueDialogues = chatState.customerSpecificChat(
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
      <View style={styles.signInCon}>
        <Text
          style={styles.signInText}
          onPress={() => navigation.navigate(screen.signIn)}>
          Please Sign in to continue
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!uniqueDialogues.length && (
        <Text style={styles.welcomeText}>
          Hello {currentUser?.userName}! 😊 How can i assist you today?
        </Text>
      )}
      <View style={styles.content}>
        {currentUser?.userId ? (
          <ScrollView
            ref={scrollViewRef}
            style={styles.messages}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContainer}>
            {uniqueDialogues.map((data: any) => (
              <View
                key={data.chatId}
                style={{
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    ...styles.avatarMessCon,
                    ...(data.alignmentKey === currentUser?.userId && {
                      justifyContent: 'flex-end',
                    }),
                  }}>
                  {!isCurrentUserMessage(data.alignmentKey) && (
                    <Image
                      source={{
                        uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D',
                      }}
                      style={styles.avatar}
                    />
                  )}
                  <View>
                    <View
                      style={{
                        ...styles.message,
                        ...(isCurrentUserMessage(data.alignmentKey) && {
                          backgroundColor: globalStyle.COLORS.BUTTON_COLOR,
                          marginTop: 20,
                        }),
                      }}>
                      <Text
                        style={{
                          ...styles.messageText,
                          ...(isCurrentUserMessage(data.alignmentKey) && {
                            color: 'white',
                          }),
                        }}>
                        {data.message}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.messageDate}>
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

        <View style={styles.messageInput}>
          <TouchableOpacity
            onPress={handleSendMessage}
            testID="button"
            disabled={!message}>
            <Entypo
              size={16}
              name="camera"
              style={{paddingRight: 8, color: globalStyle.COLORS.MUTED}}
            />
          </TouchableOpacity>

          <TextInput
            value={message}
            onChangeText={text => setMessage(text)}
            placeholder="Message"
            style={styles.input}
            placeholderTextColor="grey"
          />
        </View>
      </View>
    </View>
  );
};
export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  signInCon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: 'black',
    fontWeight: '700',
  },
  welcomeText: {
    textAlign: 'center',
    marginTop: 100,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  avatarMessCon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 50,
  },
  messages: {
    flexGrow: 1,
  },
  messagesContainer: {
    marginBottom: 50,
  },
  message: {
    padding: 10,
    marginVertical: 6,
    maxWidth: width / 2,
    borderRadius: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    color: 'black',
    flexWrap: 'nowrap',
  },
  messageText: {
    color: 'black',
    paddingVertical: 2,
  },
  messageDate: {
    color: 'black',
    paddingVertical: 2,
    fontSize: 10,
    fontWeight: '200',
    textAlign: 'right',
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  input: {
    width: width / 1.3,
    marginLeft: 15,
    padding: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    color: 'black',
    backgroundColor: 'white',
  },
});
