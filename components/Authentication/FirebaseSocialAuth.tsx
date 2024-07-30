import * as firebase from '../../components/config/firebase';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

import {USERS} from '@env';
import {screen} from '../../constants/screens';
import {Alert} from 'react-native';

const usersRoute = USERS;

export async function signInWithFacebook(
  navigate: any,
  previousRoute: string,
  setLoading: (value: boolean) => void,
  type: string,
) {
  setLoading(true);
  try {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    const data = await AccessToken.getCurrentAccessToken();

    if (result.isCancelled) {
      throw new Error('something went wrong to get access token : ');
    }
    const faceBookCredentials = firebase.FacebookAuthProvider.credential(
      data?.accessToken as string,
    );

    if (!faceBookCredentials) {
      throw new Error('something went wrong');
    }

    const fetchedUserCredential = await firebase.signInWithCredential(
      firebase.auth,
      faceBookCredentials,
    );
    if (!fetchedUserCredential) {
      throw new Error('something went wrong');
    }

    const userCollections = firebase.collection(firebase.firestore, usersRoute);

    const userSnapshot = await firebase.getDocs(userCollections);
    let userExists = false;

    for (const doc of userSnapshot.docs) {
      const userData = doc?.data() as any;
      if (
        type === screen.signUp &&
        userData?.email === fetchedUserCredential?.user.email
      ) {
        await firebase.signOut(firebase.auth);
        setLoading(false);
        Alert.alert('Email already exist');

        throw new Error();
      }
      if (userData?.email === fetchedUserCredential?.user.email) {
        userExists = true;
        break;
      }
    }

    if (!userExists) {
      const email = fetchedUserCredential.user.email;

      const newUserData = {
        userId: fetchedUserCredential.user.uid,
        email,
        role: 'Subscriber',
        joined: new Date().toString(),
        userName: fetchedUserCredential.user.displayName,
        password:
          fetchedUserCredential?.user?.email !== null &&
          fetchedUserCredential?.user?.email.split('@')[0],
      };
      await firebase.addDoc(userCollections, newUserData);
    }
    setLoading(false);

    navigate(previousRoute);
  } catch (error) {
    setLoading(false);
    Alert.alert('oops, something went wrong ', 'Try again leta');
    throw new Error('oops, something went wrong ');
  }
}
