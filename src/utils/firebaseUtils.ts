import * as firebase from '../config/firebase';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {USERS} from '@env';
import {DynamicNavigationProps,  RootStackParamList, } from '../screen';
import {Alert} from 'react-native';
import { ProductInterface } from '../hook/useProduct';
import { OrderItem } from '../hook/useOrder';
import {UserInterface} from '../hook/useUsers';

const usersRoute = USERS;

export const createInDatabase = async (url: string, requestData: Partial<ProductInterface|OrderItem>) => {
  try {
    const productCollections = firebase.collection(firebase.firestore, url);
    const newDocument = await firebase.addDoc(productCollections, requestData);

    return newDocument.id;
  } catch (error) {
    throw error;
  }
};

export const removeInDatabase = async (url: string, docId: string) => {
  try {
    const productDocumentRef = firebase.doc(firebase.firestore, url, docId);
    await firebase.deleteDoc(productDocumentRef);
    return true;
  } catch (error) {
    throw error;
  }
};



export const signInWithFacebook=async(
  navigate: DynamicNavigationProps["navigate"],
  previousRoute: keyof RootStackParamList,
  setLoading: (value: boolean) => void,
)=> {
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
      const userData = doc?.data() as UserInterface;
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
    throw new Error();
  }
}

