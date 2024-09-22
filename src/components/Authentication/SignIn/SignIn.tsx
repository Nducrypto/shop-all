import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as firebase from '../../../config/firebase';
import {useNavigation} from '@react-navigation/native';
import {useUserState} from '../../../hook/useUsers.ts';
import Entypo from 'react-native-vector-icons/Entypo';
import AuthInput, {icons} from '../AuthInput/index.tsx';
import CustomButton from '../../CustomButton/CustomButton.tsx';
import {DynamicNavigationProps, screenNames} from '../../../screen';
import {authStyles} from '../authStyles.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  checkIfBiometricKeysExist,
  loginWithBiometrics,
} from '../../../utils/biometrics.ts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  authWithService,
  signInWithFacebook,
} from '../../../utils/firebaseUtils.ts';
import {hp, wp} from '../../../config/appConfig.ts';
import themes from '../../../config/themes.ts';

const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [faceIdData, setFaceIdData] = useState({userId: '', key: ''});
  const {previousRoute, currentUser, isUserLoading} = useUserState();

  const navigation = useNavigation<DynamicNavigationProps>();

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
    } catch (error) {
      if (error instanceof firebase.FirebaseError) {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Wrong password');
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert('User not found');
        } else {
          Alert.alert('An unknown error occurred');
        }
      } else {
        Alert.alert('An unexpected error occurred');
      }

      setLoading(false);
    }
  };

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

  if (currentUser && currentUser?.email && !isUserLoading) {
    navigation.navigate(screenNames.productList);
  }
  function handleSocialAuth(type: string) {
    switch (type) {
      case 'facebook':
        signInWithFacebook(navigation.navigate, previousRoute, setLoading);
        return;
      case 'twitter':
        authWithService('Twitter', setLoading);
        return;
      case 'dribbble':
        authWithService('Dribbble', setLoading);
        return;
      default:
        return;
    }
  }
  return (
    <View style={authStyles.signupContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={themes.COLORS.DARKGREEN}
      />
      <View style={authStyles.iconsCon}>
        {icons.map(icon => (
          <Entypo
            key={icon.name}
            name={icon.name}
            color={icon.color}
            size={icon.size}
            onPress={() => handleSocialAuth(icon.type)}
            testID={icon.id}
          />
        ))}
      </View>
      <Text style={authStyles.sharedCon}>or be classical</Text>
      {faceIdData.userId && (
        <TouchableOpacity
          style={authStyles.faceIdBtn}
          onPress={handleFaceIdBiometricLogin}>
          <MaterialCommunityIcons
            name="face-recognition"
            color="#5BC0DE"
            size={30}
          />

          <Text style={authStyles.faceIdText}>Login with face id</Text>
        </TouchableOpacity>
      )}

      <View style={authStyles.sharedCon}>
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
        <Text
          style={authStyles.forgPass}
          onPress={() => navigation.navigate(screenNames.forgotPassword)}>
          Forgot your password ?{' '}
        </Text>
      </View>

      <CustomButton
        title={loading ? <ActivityIndicator color="white" /> : 'SIGN IN'}
        width={wp('90%')}
        onPress={() => handleLoginWithEmail()}
        testID="sign-in-button"
        marginTop={hp('6%')}
        disabled={!email || !password || loading}
      />

      <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} />
      <View>
        <Text
          style={authStyles.sharedText}
          onPress={() => navigation.navigate(screenNames.signUp)}>
          Don't have an Account? Sign Up
        </Text>
      </View>
    </View>
  );
};

export default SignIn;
