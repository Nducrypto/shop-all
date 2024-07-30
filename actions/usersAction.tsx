import {useEffect} from 'react';
import {
  firestore,
  collection,
  onAuthStateChanged,
  auth,
  onSnapshot,
  getDocs,
  updateDoc,
  doc,
} from '../components/config/firebase';
import {
  CollectionInterface,
  useUserState,
} from '../components/recoilState/userState';
import Crypto from 'react-native-quick-crypto';

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
    const unSubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const usersCollectionRef = collection(firestore, usersRoute);
        const userSnapshot = await getDocs(usersCollectionRef);
        for (const doc of userSnapshot.docs) {
          const data = doc?.data() as CollectionInterface;

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
          currentUser: null,
          isUserLoading: false,
          isAuthError: `User Signed Out`,
        }));
      }
    });

    return unSubscribe;
  }, [setUser]);
};

export const fetchAllUsers = () => {
  const {setUser} = useUserState();
  useEffect(() => {
    const listenForChangeUsers = onSnapshot(
      collection(firestore, usersRoute),
      snapshot => {
        const allUsers: CollectionInterface[] = [];
        snapshot.forEach(doc => {
          const data = doc.data() as CollectionInterface;
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
    const collectionRef = collection(firestore, usersRoute);
    const querySnapshot = await getDocs(collectionRef);

    for (const docSnapshot of querySnapshot.docs) {
      const docRef = doc(firestore, usersRoute, docSnapshot.id);
      const data = docSnapshot.data();

      if (data.userId === userId) {
        await updateDoc(docRef, {
          faceIdKey: publicKey,
        });
        return;
      }
    }
  } catch (error: any) {
    throw new Error();
  }
};

export const verifyFaceIdKeyInDatabase = async (
  signature: string,
  userId: string,
) => {
  try {
    const collectionRef = collection(firestore, usersRoute);
    const querySnapshot = await getDocs(collectionRef);
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

    const verify = Crypto.createVerify('sha256');
    verify.update(payloadBuffer);

    const isValid = verify.verify({key: publicKeyPem}, signatureBuffer);

    return isValid;
  } catch (error) {
    throw Error('Error verifying signature:');
  }
};

const base64ToPem = (base64Key: any, label: any) => {
  const key = `-----BEGIN ${label}-----\n${base64Key
    .match(/.{1,64}/g)
    .join('\n')}\n-----END ${label}-----\n`;
  return key;
};
