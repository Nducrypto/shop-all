import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {auth} from '../components/config/firebase';
import {SignUp} from '../components';
import {createUserWithEmailAndPassword} from '../__mocks__/firebase/auth';
import {collection, addDoc} from '../__mocks__/firebase/firestore';
import {mockNavigate} from '../__mocks__/@react-navigation/native';
import {screen} from '../constants/screens';

jest.mock('../components/recoilState/userState', () => ({
  useUserState: jest.fn(() => ({})),
}));

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render <SignUp/>', async () => {
    const {getByText, getByPlaceholderText, getByTestId} = render(<SignUp />);
    act(() => {
      expect(getByText('Already have an account? Login')).toBeTruthy();
      expect(getByTestId('sign-up-button')).toBeTruthy();
      expect(getByPlaceholderText('Email')).toBeTruthy();
      expect(getByPlaceholderText('Password')).toBeTruthy();
      expect(getByPlaceholderText('Username')).toBeTruthy();
    });
  });

  it('enables sign-up button only when input data is entered', async () => {
    const {getByPlaceholderText, getByTestId} = render(<SignUp />);
    act(() => {
      expect(
        getByTestId('sign-up-button').props.accessibilityState.disabled,
      ).toBe(true);
    });
    act(() => {
      fireEvent.changeText(getByPlaceholderText('Username'), 'test');
      fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), '12345');
    });
    act(() => {
      expect(
        getByTestId('sign-up-button').props.accessibilityState.disabled,
      ).toBe(false);
    });
  });

  it('navigate to login screen successfully', async () => {
    const {getByText} = render(<SignUp />);
    act(() => {
      fireEvent.press(getByText('Already have an account? Login'));
    });

    expect(mockNavigate).toHaveBeenCalledWith(screen.signIn);
  });

  it('signs up successfully', async () => {
    const {getByPlaceholderText, getByTestId} = render(<SignUp />);
    const mockUserCredential = {
      auth,
      user: {uid: '123', email: 'test@example.com'},
    };
    createUserWithEmailAndPassword.mockReturnValueOnce(mockUserCredential);

    act(() => {
      fireEvent.changeText(getByPlaceholderText('Username'), 'test');
      fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), '12345');
    });

    act(() => {
      fireEvent.press(getByTestId('sign-up-button'));
    });

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        '12345',
      );
    });
    expect(collection).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledTimes(1);
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it('shows error message when email is already in use', async () => {
    const {getByPlaceholderText, getByTestId} = render(<SignUp />);
    createUserWithEmailAndPassword.mockRejectedValue({
      message: 'Firebase: Error (auth/email-already-in-use).',
    });

    act(() => {
      fireEvent.changeText(getByPlaceholderText('Username'), 'test');
      fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), '12345');
    });
    act(() => {
      fireEvent.press(getByTestId('sign-up-button'));
    });

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        'test@example.com',
        '12345',
      );
    });
  });
});
