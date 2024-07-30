import {
  firestore,
  doc,
  collection,
  updateDoc,
  onSnapshot,
} from '../components/config/firebase';
import {Message, useAllChatState} from '../components/recoilState/chatState';
import {useEffect} from 'react';
import {
  createInDatabase,
  mergeSort,
  removeInDatabase,
} from '../constants/utils';
import {
  snackBarFailure,
  snackBarSuccess,
} from '../components/recoilState/snacbarState';
import {CHATS} from '@env';

const chatsRoute = CHATS;

export const createMessage = async (messageData: Message, setSnackBar: any) => {
  try {
    await createInDatabase(chatsRoute, messageData);
  } catch (error) {
    snackBarFailure('Failed to send Chat ', 'error', setSnackBar);
  }
};

export const fetchAllChat = () => {
  const {setChat} = useAllChatState();

  useEffect(() => {
    const listenForChangeInChats = onSnapshot(
      collection(firestore, chatsRoute),
      snapshot => {
        const fetchedData: Message[] = [];
        snapshot.forEach(doc => {
          const data = doc.data() as Message;

          if (data?.timestamp) {
            fetchedData.push({
              ...data,
              chatId: doc.id,
              date: new Date(data.timestamp).toString(),
            });
          }
        });

        const sortedDialogueByTime = mergeSort(fetchedData, (a, b) => {
          return a?.timestamp - b?.timestamp;
        });

        const updatedChats: Record<string, Message[]> = {};
        for (const message of sortedDialogueByTime) {
          const conversationId = message.customerId;
          if (!updatedChats[conversationId]) {
            updatedChats[conversationId] = [];
          }
          updatedChats[conversationId].push(message);
        }
        setChat(prev => ({...prev, allChat: updatedChats}));
      },
    );

    return () => {
      listenForChangeInChats();
    };
  }, [setChat]);
};

export const updateUnreadMessage = async (unreadmessageArray: Message[]) => {
  try {
    for (const message of unreadmessageArray) {
      const productIdRef = doc(firestore, chatsRoute, message.chatId);
      await updateDoc(productIdRef, {
        status: 'Read',
      });
    }
  } catch (error) {
    throw new Error('Failed to update unread message');
  }
};

export const deleteChat = async (chatId: string, setSnackBar: any) => {
  try {
    await removeInDatabase(chatsRoute, chatId);
    snackBarSuccess('Chat deleted successfully', 'success', setSnackBar);
  } catch (error) {
    snackBarFailure('Failed to delete Chat ', 'error', setSnackBar);
  }
};
