import React from 'react';
import {render, fireEvent, act, waitFor} from '@testing-library/react-native';
import {Chat} from '../src/components';
import {createMessage, updateUnreadMessage} from '../src/actions/chatActions';
import {
  customerSpecificChat,
  messageNotificationForCustomer,
} from '../src/hook/useChat';
import {useUserState} from '../src/hook/useUsers';

jest.mock('../src/actions/chatActions', () => ({
  fetchAllChat: jest.fn(),
  createMessage: jest.fn(),
  updateUnreadMessage: jest.fn(),
}));

jest.mock('../src/hook/useChat', () => ({
  customerSpecificChat: jest.fn(() => []),
  messageNotificationForCustomer: jest.fn(() => []),
  useAllChatState: jest.fn(() => ({
    allChat: [],
  })),
}));

jest.mock('../src/hook/useUsers', () => ({
  useUserState: jest.fn(() => ({
    currentUser: {
      userId: '123',
      email: 'user@example.com',
      role: 'customer',
      userName: 'John Doe',
    },
  })),
}));

jest.mock('../src/hook/useSnackbar', () => ({
  useSnackBarState: jest.fn(() => ({
    setSnacBar: jest.fn(),
  })),
}));

describe('Chat Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    (customerSpecificChat as jest.Mock).mockReturnValue([]);

    const {getByText} = render(<Chat />);

    expect(
      getByText('Hello John Doe! 😊 How can i assist you today?'),
    ).toBeTruthy();
  });

  it('handles sending message', async () => {
    const {getByPlaceholderText, getByTestId} = render(<Chat />);

    act(() => {
      fireEvent.changeText(getByPlaceholderText('Message'), 'Hello World');
    });

    fireEvent.press(getByTestId('button'));

    await waitFor(() => {
      expect(createMessage).toHaveBeenCalledTimes(1);
      expect(createMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Hello World',
          email: 'user@example.com',
          role: 'customer',
          senderType: 'customer',
          status: 'Unread',
          customerId: '123',
          alignmentKey: '123',
          userName: 'John Doe',
        }),
        undefined,
      );
    });
  });

  it('updates unread messages if there are any', async () => {
    (messageNotificationForCustomer as jest.Mock).mockReturnValue([{id: '1'}]);

    render(<Chat />);
    await waitFor(() => {
      expect(updateUnreadMessage).toHaveBeenCalledWith([{id: '1'}]);
    });
  });

  it('enables send button only when message is entered', async () => {
    const {getByPlaceholderText, getByTestId} = render(<Chat />);

    expect(getByTestId('button').props.accessibilityState.disabled).toBe(true);

    act(() => {
      fireEvent.changeText(getByPlaceholderText('Message'), 'Hello World');
    });

    expect(getByTestId('button').props.accessibilityState.disabled).toBe(false);
  });

  it('does not render if currentUser email is missing', () => {
    (useUserState as jest.Mock).mockReturnValue({
      currentUser: null,
    });
    const {queryByText} = render(<Chat />);

    expect(
      queryByText('Hello John Doe! 😊 How can i assist you today?'),
    ).toBeNull();
  });
});
