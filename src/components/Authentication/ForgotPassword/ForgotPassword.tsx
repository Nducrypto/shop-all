import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AuthInput from '../AuthInput/index.tsx';
import CustomButton from '../../CustomButton/CustomButton.tsx';
import {wp} from '../../../config/appConfig.ts';
import * as toast from '../../../hook/useSnackbar.ts';
import * as firebase from '../../../config/firebase';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, screenNames} from '../../../screen';
import {forgotPasswordStyles} from './forgotPasswordStyles.ts';

const ForgotPassword = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const {setSnackBar} = toast.useSnackBarState();
  const navigation = useNavigation<NavigationProps>();

  async function handleSend() {
    if (!email) {
      return;
    }
    setLoading(true);
    try {
      await firebase.sendPasswordResetEmail(firebase.auth, email);
      toast.snackBarSuccess(
        'Password reset mail sent. check your inbox',
        'success',
        setSnackBar,
      );
      setLoading(false);
    } catch (error) {
      toast.snackBarFailure(
        'Oops! An error occured, check your network connection and try again',
        'error',
        setSnackBar,
      );
      setLoading(false);
    }
    setEmail('');
  }
  return (
    <View style={forgotPasswordStyles.container}>
      <Text style={forgotPasswordStyles.text}>
        Input your email to reset your password
      </Text>
      <AuthInput
        placeholder="Email"
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(screenNames.signIn)}
        style={forgotPasswordStyles.remPasswordButt}>
        <Text style={forgotPasswordStyles.remPasswordText}>
          Remember password ?
        </Text>
        <Text style={forgotPasswordStyles.link}>Login</Text>
      </TouchableOpacity>

      {!loading && (
        <CustomButton
          title="SUBMIT"
          width={wp(' 80%')}
          onPress={handleSend}
          testID="forgot-password-btn"
          marginTop={40}
          disabled={!email}
        />
      )}
    </View>
  );
};

export default ForgotPassword;
