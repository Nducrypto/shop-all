import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import AuthInput from '../AuthInput/AuthInput';
import globalStyle from '../../../constants/globalStyle';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {width} from '../../../constants/utils';
import * as toast from '../../../components/recoilState/snacbarState';
import * as firebase from '../../../components/config/firebase';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps, screen} from '../../../constants/screens';

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
    <View style={styles.container}>
      <Text style={styles.text}>Input your email to reset your password</Text>
      <AuthInput
        placeholder="Email"
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(screen.signIn)}
        style={styles.remPasswordButt}>
        <Text style={styles.remPasswordText}>Remember password ?</Text>
        <Text style={styles.link}>Login</Text>
      </TouchableOpacity>

      {!loading && (
        <CustomButton
          title="SUBMIT"
          width={width / 2}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalStyle.COLORS.DARKGREEN,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 40,
    fontSize: 15,
    fontWeight: '700',
  },
  remPasswordButt: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  remPasswordText: {
    fontSize: 14,
    color: 'white',
  },
  link: {
    color: 'white',

    fontSize: 14,
  },
});
