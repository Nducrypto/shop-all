import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {
  updateFaceIdStatus,
  verifyFaceIdKeyInDatabase,
} from '../actions/usersAction';

const rnBiometrics = new ReactNativeBiometrics();

export const checkBiometrics = async () => {
  try {
    const {available, biometryType} = await rnBiometrics?.isSensorAvailable();

    if (!available) {
      return false;
    } else if (available && biometryType === BiometryTypes.FaceID) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw Error('Error in checkBiometrics: ');
  }
};
export const generateBiometricPublicKey = async () => {
  try {
    const keysExist = await checkIfBiometricKeysExist();

    if (keysExist) {
      throw Error('keys exist');
    }
    const {publicKey}: {publicKey: string} = await rnBiometrics.createKeys();
    return publicKey;
  } catch (error) {
    throw Error('Error generating key:');
  }
};

export const checkIfBiometricKeysExist = async () => {
  try {
    const {keysExist} = await rnBiometrics.biometricKeysExist();
    return keysExist;
  } catch (error) {
    throw error;
  }
};
export const deleteBiometricPublicKey = async () => {
  try {
    const {keysDeleted} = await rnBiometrics.deleteKeys();
    if (!keysDeleted) {
      return;
    }

    return;
  } catch (error) {
    throw Error('Error deleting key:');
  }
};

export const loginWithBiometrics = async (userId: string) => {
  try {
    if (!rnBiometrics) {
      throw new Error('ReactNativeBiometrics is not initialized');
    }
    const isAvailable = await checkBiometrics();
    if (!isAvailable) {
      throw new Error('FaceID not enabled');
    }
    const keysExist = await checkIfBiometricKeysExist();
    if (!keysExist) {
      const {publicKey} = await rnBiometrics.createKeys();
      await updateFaceIdStatus(userId, publicKey);
    }
    const {success, signature} = await rnBiometrics.createSignature({
      promptMessage: 'Sign In',
      payload: userId,
    });

    if (!success || !signature) {
      throw new Error('Biometrics Authentication Failed');
    }

    const isVerified = await verifyFaceIdKeyInDatabase(signature, userId);

    return isVerified;
  } catch (error) {
    throw Error(`Error in biometric login:${error}`);
  }
};
