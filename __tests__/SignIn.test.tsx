import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {auth} from '../components/config/firebase';
import {SignIn} from '../components';
import {signInWithEmailAndPassword} from '../__mocks__/firebase/auth';
import {mockNavigate} from '../__mocks__/@react-navigation/native';
import {screen} from '../constants/screens';
import * as biometrick from '../constants/biometricsUtils';
import {signInWithFacebook} from '../components/Authentication/FirebaseSocialAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userId = '123456';
jest.mock('../components/recoilState/userState', () => ({
  useUserState: () => ({
    user: {
      currentUser: {
        userId,
      },
      previousRoute: 'Product-List',
      isUserLoading: false,
    },
    setUser: jest.fn(() => ({})),
  }),
}));

jest.mock('../constants/biometricsUtils', () => ({
  checkIfBiometricKeysExist: jest.fn(),
  loginWithBiometrics: jest.fn(),
}));
jest.mock('../components/Authentication/FirebaseSocialAuth', () => ({
  signInWithFacebook: jest.fn(),
}));

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('render <Sign In/>', () => {
    const {getByText, getByPlaceholderText} = render(<SignIn />);

    act(() => {
      expect(getByText('Forgot your password ?')).toBeTruthy();
      expect(getByPlaceholderText('Email')).toBeTruthy();
      expect(getByText("Don't have an Account? Sign Up")).toBeTruthy();
      fireEvent.press(getByText("Don't have an Account? Sign Up"));
    });
  });
  it('should render face id button if faceIdData is available', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({userId: '123'}),
    );

    (biometrick.checkIfBiometricKeysExist as jest.Mock).mockReturnValueOnce(
      true,
    );
    const {getByText} = render(<SignIn />);

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalled();
      expect(biometrick.checkIfBiometricKeysExist).toHaveBeenCalledTimes(1);

      expect(getByText('Login with face id')).toBeTruthy();
    });
  });

  it('should call BiometricLogin when face id button is pressed', async () => {
    const email = 'test@example.com';
    const password = '12345';

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify({userId: '123', faceIKey: 'key'}),
    );
    (biometrick.checkIfBiometricKeysExist as jest.Mock).mockReturnValueOnce(
      true,
    );

    (biometrick.loginWithBiometrics as jest.Mock).mockReturnValueOnce({
      email,
      password,
    });
    const {getByText} = render(<SignIn />);

    signInWithEmailAndPassword.mockResolvedValueOnce({
      email,
      password,
    });
    await waitFor(() => {
      expect(getByText('Login with face id')).toBeTruthy();
    });
    act(() => {
      fireEvent.press(getByText('Login with face id'));
    });
    await waitFor(() => {
      expect(biometrick.checkIfBiometricKeysExist).toHaveBeenCalled();
      expect(biometrick.loginWithBiometrics).toHaveBeenCalled();
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        auth,
        email,
        password,
      );
    });
  });

  it('should call handleFaceebokSignIn when Facebook icon is pressed', async () => {
    const {getByTestId} = render(<SignIn />);
    act(() => {
      fireEvent.press(getByTestId('facebook-login-icon'));
    });
    await waitFor(() => {
      expect(signInWithFacebook).toHaveBeenCalled();
    });
  });

  it('navigate to sign-up screen successfully', async () => {
    const {getByText} = render(<SignIn />);
    act(() => {
      fireEvent.press(getByText("Don't have an Account? Sign Up"));
    });

    expect(mockNavigate).toHaveBeenCalledWith(screen.signUp);
  });

  it('logs in successfully with email and password', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({});

    const {getByPlaceholderText, getByText, queryByText, getByTestId} = render(
      <SignIn />,
    );

    act(() => {
      fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), '12345');
    });
    fireEvent.press(getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1),
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
          auth,
          'test@example.com',
          '12345',
        );
    });
    expect(queryByText('Wrong Password')).toBeNull();
    expect(queryByText('User not found')).toBeNull();
  });

  it('shows error message when email is already in use', async () => {
    const {getByPlaceholderText, getByTestId} = render(<SignIn />);
    signInWithEmailAndPassword.mockRejectedValue({
      message: 'Firebase: Error (auth/email-already-in-use).',
    });

    act(() => {
      fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), '12345');
    });
    act(() => {
      fireEvent.press(getByTestId('sign-in-button'));
    });

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
  });

  it('handles email and password sign-in with incorrect credentials', async () => {
    const {getByPlaceholderText, getByText, getByTestId} = render(<SignIn />);

    signInWithEmailAndPassword.mockRejectedValueOnce({
      message: 'Firebase: Error (auth/wrong-password).',
    });
    act(() => {
      fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), 'wrongpassword');
    });
    act(() => {
      fireEvent.press(getByTestId('sign-in-button'));
    });

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
    expect(getByText('SIGN IN')).toBeTruthy();
  });
});
