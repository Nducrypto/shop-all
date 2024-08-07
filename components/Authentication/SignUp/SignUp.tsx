import React, {useState} from 'react';
import {View, Text, ActivityIndicator, StatusBar, Alert} from 'react-native';
import * as firebase from '../../config/firebase';
import {useNavigation} from '@react-navigation/native';
import {USERS} from '@env';
import {styles} from '../SignIn/signInStyles';
import CustomButton from '../../CustomButton/CustomButton';
import AuthInput from '../AuthInput/AuthInput';
import Entypo from 'react-native-vector-icons/Entypo';
import {signInWithFacebook} from '../FirebaseSocialAuth';
import {useUserState} from '../../recoilState/userState';
import {screen} from '../../../constants/screens';

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const {previousRoute} = useUserState();
  const users = USERS;

  const handleSignupWithEmail = async () => {
    setLoading(true);
    try {
      const fetchedUserCredential =
        await firebase.createUserWithEmailAndPassword(
          firebase.auth,
          email,
          password,
        );
      if (!fetchedUserCredential) {
        setLoading(false);

        return;
      }

      const userData = {
        userId: fetchedUserCredential.user.uid,
        email: fetchedUserCredential.user.email,
        role: 'Subscriber',
        joined: new Date().toString(),
        userName,
        password,
      };

      const userCollections = firebase.collection(firebase.firestore, users);
      await firebase.addDoc(userCollections, userData);

      navigation.navigate(previousRoute);
      setLoading(false);
    } catch (error: any) {
      const errorMessage = error.message;

      if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
        Alert.alert('Email-Already-In-Use');
      } else {
        Alert.alert('Password should be at least 6 characters');
      }
      setLoading(false);
    }
  };

  function handleFaceebokSignIn() {
    signInWithFacebook(
      navigation.navigate,
      previousRoute,
      setLoading,
      screen.signUp,
    );
  }

  return (
    <View style={styles.signupContainer}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.iconsCon}>
        <Entypo
          name="facebook-with-circle"
          color="blue"
          size={50}
          onPress={handleFaceebokSignIn}
        />
        <Entypo name="twitter-with-circle" color="#5BC0DE" size={50} />
        <Entypo name="dribbble-with-circle" color="#EA4C89" size={50} />
      </View>
      <View style={styles.sharedCon}>
        <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>
          or be classical
        </Text>
      </View>
      <View style={styles.sharedCon}>
        <AuthInput
          placeholder="Username"
          value={userName}
          onChangeText={value => setUserName(value)}
        />
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

        <View style={styles.sharedCon}>
          <CustomButton
            title={loading ? <ActivityIndicator color="white" /> : 'SIGN UP'}
            width="100%"
            onPress={() => handleSignupWithEmail()}
            testID="sign-up-button"
            disabled={!userName || !email || !password || loading}
          />
        </View>
      </View>

      <View>
        <Text
          style={styles.sharedText}
          onPress={() => navigation.navigate(screen.signIn)}>
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
