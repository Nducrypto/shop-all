import {useEffect} from 'react';
import * as firebase from '../config/firebase';
import {UserInterface, useUserState,initialUserState} from '../hook/useUsers';
import crypto from 'react-native-quick-crypto';

import {USERS} from '@env';

const usersRoute = USERS;

export const useAuthentication = () => {
  const {setUser} = useUserState();

  useEffect(() => {
    setUser(prev => ({
      ...prev,
      isUserLoading: true,
      isAuthError: false,
    }));
    const unSubscribe = firebase.onAuthStateChanged(
      firebase.auth,
      async user => {
        if (user) {
          const usersCollectionRef = firebase.collection(
            firebase.firestore,
            usersRoute,
          );
          const userSnapshot = await firebase.getDocs(usersCollectionRef);
          for (const doc of userSnapshot.docs) {
            const data = doc?.data() as UserInterface;

            if (data?.email === user?.email) {
              setUser(prev => ({
                ...prev,
                currentUser: data,
                isUserLoading: false,
              }));

              return;
            }
          }
        } else {
          setUser(prev => ({
            ...prev,
            currentUser: initialUserState,
            isUserLoading: false,
            isAuthError: `User Signed Out`,
          }));
        }
      },
    );

    return unSubscribe;
  }, [setUser]);
};

export const fetchAllUsers = () => {
  const {setUser} = useUserState();
  useEffect(() => {
    const listenForChangeUsers = firebase.onSnapshot(
      firebase.collection(firebase.firestore, usersRoute),
      snapshot => {
        const allUsers: UserInterface[] = [];
        snapshot.forEach(doc => {
          const data = doc.data() as UserInterface;
          allUsers.push({
            ...data,
            docId: doc.id,
          });
        });
        setUser(prev => ({
          ...prev,
          usersCollection: allUsers,
        }));
      },
    );
    return () => {
      listenForChangeUsers();
    };
  }, [setUser]);
};

export const updateFaceIdStatus = async (userId: string, publicKey: string) => {
  try {
    const collectionRef = firebase.collection(firebase.firestore, usersRoute);
    const querySnapshot = await firebase.getDocs(collectionRef);

    for (const docSnapshot of querySnapshot.docs) {
      const docRef = firebase.doc(
        firebase.firestore,
        usersRoute,
        docSnapshot.id,
      );
      const data = docSnapshot.data();

      if (data.userId === userId) {
        await firebase.updateDoc(docRef, {
          faceIdKey: publicKey,
        });
        return;
      }
    }
  } catch (error) {
    throw new Error();
  }
};

export const verifyFaceIdKeyInDatabase = async (
  signature: string,
  userId: string,
) => {
  try {
    const collectionRef = firebase.collection(firebase.firestore, usersRoute);
    const querySnapshot = await firebase.getDocs(collectionRef);
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();

      if (data.userId === userId) {
        const publicKey = data.faceIdKey;

        const isValid = verifySignature(publicKey, userId, signature);

        if (isValid) {
          return {email: data.email, password: data.password};
        } else {
          return false;
        }
      }
    }
    return false;
  } catch (error) {
    throw new Error('Error verifying FaceID key');
  }
};

const verifySignature = (
  publicKeyBase64: string,
  payload: string,
  signatureBase64: string,
) => {
  try {
    const publicKeyPem = base64ToPem(publicKeyBase64, 'PUBLIC KEY');

    const payloadBuffer = Buffer.from(payload, 'utf8');
    const signatureBuffer = Buffer.from(signatureBase64, 'base64');

    const verify = crypto.createVerify('sha256');
    verify.update(payloadBuffer);

    const isValid = verify.verify({key: publicKeyPem}, signatureBuffer);

    return isValid;
  } catch (error) {
    throw Error('Error verifying signature:');
  }
};

const base64ToPem = (base64Key: string, label: string) => {
    // const key = `-----BEGIN ${label}-----\n${base64Key.match(/.{1,64}/g)
    //   .join('\n')}\n-----END ${label}-----\n`;
    // return key;

    const base64Lines = base64Key.match(/.{1,64}/g);
    if (!base64Lines) {
        throw new Error("Invalid base64 key format");
    }
    const key = `-----BEGIN ${label}-----\n${base64Lines.join('\n')}\n-----END ${label}-----\n`;

    return key;
};
