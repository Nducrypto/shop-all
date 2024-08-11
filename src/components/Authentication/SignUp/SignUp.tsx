import React, {useState} from 'react';
import {View, Text, ActivityIndicator, StatusBar, Alert} from 'react-native';
import * as firebase from '../../../config/firebase';
import {useNavigation} from '@react-navigation/native';
import {USERS} from '@env';
import {authStyles} from '../authStyles';
import CustomButton from '../../CustomButton/CustomButton';
import AuthInput, {icons} from '../AuthInput';
import Entypo from 'react-native-vector-icons/Entypo';
import {signInWithFacebook} from '../../../utils/firebaseUtils';
import {useUserState} from '../../../hook/useUsers';
import {
  RootStackParamList,
  screenNames,
  DynamicNavigationProps,
} from '../../../screen';
import {wp} from '../../../config/appConfig';

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<DynamicNavigationProps>();
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

      navigation.navigate(previousRoute as keyof RootStackParamList);
      setLoading(false);
    } catch (error) {
      if (error instanceof firebase.FirebaseError) {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Email already in use');
        } else {
          Alert.alert('Password should be at least 6 characters');
        }
      }
      setLoading(false);
    }
  };

  function handleFaceebokSignIn() {
    signInWithFacebook(navigation.navigate, previousRoute, setLoading);
  }

  function isFaceBook(label: string) {
    return label === 'facebook-with-circle';
  }
  return (
    <View style={authStyles.signupContainer}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={authStyles.iconsCon}>
        {icons.map(icon => (
          <Entypo
            key={icon.name}
            name={icon.name}
            color={icon.color}
            size={icon.size}
            onPress={() => isFaceBook(icon.id) && handleFaceebokSignIn()}
          />
        ))}
      </View>
      <View style={authStyles.sharedCon}>
        <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>
          or be classical
        </Text>
      </View>
      <View style={authStyles.sharedCon}>
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

        <View style={authStyles.sharedCon}>
          <CustomButton
            title={loading ? <ActivityIndicator color="white" /> : 'SIGN UP'}
            width={wp('90%')}
            onPress={() => handleSignupWithEmail()}
            testID="sign-up-button"
            disabled={!userName || !email || !password || loading}
          />
        </View>
      </View>

      <View>
        <Text
          style={authStyles.sharedText}
          onPress={() => navigation.navigate(screenNames.signIn)}>
          Already have an account? Login
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
