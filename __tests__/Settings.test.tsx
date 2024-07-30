import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {Alert} from 'react-native';
import {Settings} from '../components';
import * as biometricsUtils from '../constants/biometricsUtils';
import {updateFaceIdStatus} from '../actions/usersAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../components/recoilState/userState', () => ({
  useUserState: () => ({
    currentUser: {
      userId: 'user123',
      userName: 'John Doe',
      isUserLoading: false,
    },
  }),
}));
jest.mock('../components/Settings/settingsData', () => ({
  recommended: [
    {
      title: 'Use FaceID to sign in',
      id: 'face',
      type: 'switch',
      screen: '',
    },
    {
      title: 'Auto-Lock security',
      id: 'autoLock',
      type: 'switch',
      screen: '',
    },
  ],

  payment: [
    {
      title: 'Manage Payment Options',
      id: 'Payment',
      type: 'button',
      screen: 'Payment-Options',
    },
  ],

  privacy: [
    {title: 'Privacy', id: 'Privacy', type: 'button', screen: 'Privacy'},
  ],
}));
jest.mock('../constants/biometricsUtils', () => ({
  checkBiometrics: jest.fn(),
  deleteBiometricPublicKey: jest.fn(),
  generateBiometricPublicKey: jest.fn(),
}));

jest.mock('../actions/usersAction', () => ({
  updateFaceIdStatus: jest.fn(() => ({})),
}));

describe('Settings Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders settings sections and switch states correctly', async () => {
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce('someFaceId')
      .mockResolvedValueOnce('someAutoLock');

    const {getByText, getByTestId} = render(<Settings />);

    await waitFor(() => {
      expect(getByText('Recommended Settings')).toBeTruthy();
      expect(getByText('Payment Settings')).toBeTruthy();
      expect(getByText('Privacy Settings')).toBeTruthy();
    });
    expect(getByTestId('switchface')).toBeTruthy();
  });

  test('fetches and verifies settings data from AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock)
      .mockResolvedValueOnce('shopeEaseFaceId')
      .mockResolvedValueOnce('shopeEaseAutoLock');
    render(<Settings />);

    await waitFor(() => {
      expect(AsyncStorage.getItem).toHaveBeenCalledTimes(2);
    });
  });

  test('toggles auto-lock setting to true', async () => {
    AsyncStorage.setItem('shopeEaseAutoLock', JSON.stringify(true));
    const {getByTestId} = render(<Settings />);

    act(() => {
      fireEvent(getByTestId('switchface'), 'valueChange', true);
    });

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'shopeEaseAutoLock',
        JSON.stringify(true),
      );
    });
  });

  test('toggles auto-lock setting to true', async () => {
    AsyncStorage.removeItem('shopeEaseAutoLock');
    const {getByTestId} = render(<Settings />);

    act(() => {
      fireEvent(getByTestId('switchface'), 'valueChange', false);
    });

    await waitFor(() => {
      expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(1);
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('shopeEaseAutoLock');
    });
  });

  test('alerts user when biometrics are not enrolled', async () => {
    (AsyncStorage.getItem as jest.Mock).mockImplementation(key => {
      return Promise.resolve(null);
    });

    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation();
    const {getByTestId} = render(<Settings />);
    fireEvent(getByTestId('switchface'), 'valueChange', true);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalledWith(
        'Biometrics Not Enrolled',
        'No biometrics are enrolled on this device. Please go to your device settings and enroll biometrics.',
        expect.any(Array),
      );
    });
  });

  test('alerts user and processes Face ID authentication when biometrics are registered', async () => {
    (biometricsUtils.checkBiometrics as jest.Mock).mockResolvedValue(true);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation();

    const {getByTestId} = render(<Settings />);

    act(() => {
      fireEvent(getByTestId('switchface'), 'valueChange', true);
    });
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalledWith(
        'Face ID',
        'Enable Face ID authentication?',
        expect.any(Array),
      );
    });
  });

  test('successfully enables Face ID and updates status', async () => {
    (biometricsUtils.checkBiometrics as jest.Mock).mockResolvedValue(true);
    (biometricsUtils.generateBiometricPublicKey as jest.Mock).mockResolvedValue(
      'generatedPublicKey',
    );

    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

    const mockAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation((title, message, buttons) => {
        buttons && buttons[0].onPress && buttons[0].onPress();
      });
    const {getByTestId} = render(<Settings />);

    act(() => {
      fireEvent(getByTestId('switchface'), 'valueChange', true);
    });
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalledWith(
        'Face ID',
        'Enable Face ID authentication?',
        expect.any(Array),
      );
      expect(updateFaceIdStatus).toHaveBeenCalledWith(
        'user123',
        'generatedPublicKey',
      );
    });
  });

  test('handles error in AsyncStorage operations', async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
      new Error('Storage Error'),
    );
    const mockAlert = jest.spyOn(Alert, 'alert').mockImplementation();

    const {getByText} = render(<Settings />);

    await waitFor(() => {
      expect(getByText('Recommended Settings')).toBeTruthy();
    });
    expect(mockAlert).toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith(
      'Failed to load settings from storage:',
    );
  });
});
