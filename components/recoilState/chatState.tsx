import {atom, useRecoilState} from 'recoil';
import {mergeSort} from '../../constants/utils';

export interface Message {
  timestamp: number;
  customerId: string;
  status: string;
  senderType: string;
  message: string;
  email: string;
  role: string;
  alignmentKey: string;
  chatId: string;
  date: string;
  userName: string;
}

interface ChatState {
  allChat: Record<string, Message[]>;
}

const chatState = atom<ChatState>({
  key: 'chatKey',
  default: {
    allChat: {},
  },
});

export const useAllChatState = () => {
  const [chat, setChat] = useRecoilState(chatState);
  const {allChat} = chat;
  return {setChat, chat, allChat};
};

export const customerSpecificChat = (customerId: string, allChat: any) => {
  const messages = allChat[customerId] || [];
  return messages;
};

export const messageNotificationForCustomer = (
  customerId: string,
  allChat: any,
) => {
  const messages = customerSpecificChat(customerId, allChat);
  const isUnReadCustomerMessage = messages.filter(
    ({status, senderType}: Message) =>
      status === 'Unread' && senderType === 'customer-service',
  );

  return isUnReadCustomerMessage;
};

export const customerAssistHub = () => {
  const {allChat} = useAllChatState();

  const data = Object.entries(allChat);
  const customCompare = (a: [string, Message[]], b: [string, Message[]]) => {
    const lastMessageA = a[1][a[1].length - 1];
    const lastMessageB = b[1][b[1].length - 1];

    const timestampA = lastMessageA?.timestamp || 0;
    const timestampB = lastMessageB?.timestamp || 0;

    return timestampB - timestampA;
  };

  const sortedConversations = mergeSort(data, customCompare);
  return sortedConversations;
};
