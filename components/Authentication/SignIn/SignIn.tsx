import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as firebase from '../../config/firebase';
import {useNavigation} from '@react-navigation/native';
import {useUserState} from '../../recoilState/userState';
import Entypo from 'react-native-vector-icons/Entypo';
import AuthInput from '../AuthInput/AuthInput';
import CustomButton from '../../CustomButton/CustomButton';
import {screen} from '../../../constants/screens';
import {signInWithFacebook} from '../FirebaseSocialAuth';
import {styles} from './signInStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  checkIfBiometricKeysExist,
  loginWithBiometrics,
} from '../../../constants/biometricsUtils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
// import {TwitterLogin} from 'react-native-login-twitter';
// import TwitterSignin from 'react-native-login-twitter';

// Initialize Twitter SDK with API Key and API Secret Key
// TwitterSignin.init(
//   'xuclCSBOouklC619U57TfUfbj',
//   'JHRJlO2jjjUmWFspBd2PyKDpix3OkKb7UKZ7u4cpRwgwcILiZo',
// );

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [faceIdData, setFaceIdData] = useState({userId: '', key: ''});
  const {previousRoute, currentUser, isUserLoading} = useUserState();

  const navigation = useNavigation() as any;

  const handleLoginWithEmail = async () => {
    setLoading(true);
    try {
      const userCredential = await firebase.signInWithEmailAndPassword(
        firebase.auth,
        email,
        password,
      );

      if (userCredential) {
        navigation.navigate(previousRoute);
      }
      setLoading(false);
    } catch (error: any) {
      if (error.message === 'Firebase: Error (auth/wrong-password).') {
        Alert.alert('Wrong password');
      } else {
        Alert.alert('User not found');
      }
      setLoading(false);
    }
  };

  function handleFaceebokSignIn() {
    signInWithFacebook(
      navigation.navigate,
      previousRoute,
      setLoading,
      screen.signIn,
    );
  }

  useEffect(() => {
    async function loadDataFromStorage() {
      try {
        const shopeEaseFaceId = await AsyncStorage.getItem('shopeEaseFaceId');
        const keysExist = await checkIfBiometricKeysExist();
        if (shopeEaseFaceId !== null && keysExist) {
          const parsedItem = JSON.parse(shopeEaseFaceId);
          setFaceIdData(parsedItem);
        }
      } catch (error) {
        Alert.alert('Failed to load Face ID data');
        throw new Error();
      }
    }
    loadDataFromStorage();
  }, []);

  async function handleFaceIdBiometricLogin() {
    try {
      const data = await loginWithBiometrics(faceIdData?.userId);
      if (data) {
        setLoading(true);
        const email = data.email;
        const password = data.password;
        const userCredential = await firebase.signInWithEmailAndPassword(
          firebase.auth,
          email,
          password,
        );
        if (userCredential) {
          navigation.navigate(previousRoute);
        }
        setLoading(false);
      } else {
        Alert.alert('Authentication failed');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Authentication failed');
    }
  }

  const signInWithTwitter = async () => {
    try {
      // Start Twitter login process
      // const authToken = await TwitterLogin.logIn();
      // const {authToken, authTokenSecret} = await TwitterLogin.logIn();
      // const {authToken, authTokenSecret} = await TwitterSignin.logIn();
      // Create a Twitter credential with the token
      // const twitterCredential = TwitterAuthProvider.credential(
      //   authToken,
      //   authTokenSecret,
      // );
      // console.log('twitterCredential: ', twitterCredential);
      // Sign-in with the credential
      // await signInWithCredential(auth, twitterCredential);
      // You can get user details from the result
      // console.log('User Info:', autcurrentUser);
    } catch (error) {
      console.error('Error signing in with Twitter:', error);
    }
  };

  if (currentUser && currentUser?.email && !isUserLoading) {
    navigation.navigate(screen.homeStack);
  }

  return (
    <View style={styles.signupContainer}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.iconsCon}>
        <Entypo
          name="facebook-with-circle"
          color="#3B5998"
          size={50}
          onPress={handleFaceebokSignIn}
          testID="facebook-login-icon"
        />
        <Entypo
          name="twitter-with-circle"
          color="#5BC0DE"
          size={50}
          onPress={signInWithTwitter}
        />
        <Entypo name="facebook-with-circle" color="#EA4C89" size={50} />
      </View>
      <Text style={styles.sharedCon}>or be classical</Text>
      {loading && <ActivityIndicator />}
      {faceIdData.userId && (
        <TouchableOpacity
          style={{
            // backgroundColor: 'red',
            width: 130,
            alignSelf: 'center',
            padding: 6,
            alignItems: 'center',
            marginTop: 30,
          }}
          onPress={handleFaceIdBiometricLogin}>
          <MaterialCommunityIcons
            name="face-recognition"
            color="#5BC0DE"
            size={30}
          />

          <Text style={{color: 'white', marginTop: 10}}>
            Login with face id
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.sharedCon}>
        <AuthInput
          placeholder="Email"
          value={email}
          onChangeText={value => setEmail(value)}
        />
        <AuthInput
          iconName="lock"
          placeholder="Password"
          value={password}
          onChangeText={value => setPassword(value)}
        />
      </View>

      <View>
        <Text style={styles.forgPass} onPress={() => {}}>
          Forgot your password ?{' '}
        </Text>
      </View>
      {!loading && (
        <CustomButton
          title="SIGN IN"
          width="100%"
          onPress={() => handleLoginWithEmail()}
          testID="sign-in-button"
          marginTop={40}
          disabled={!email || !password}
        />
      )}
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
        // style={styles.gradient}
      />
      <View>
        <Text
          style={styles.sharedText}
          onPress={() => navigation.navigate(screen.signUp)}>
          Don't have an Account? Sign Up
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
