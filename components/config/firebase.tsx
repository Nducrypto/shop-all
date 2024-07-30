import {initializeApp} from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  initializeAuth,
  getReactNativePersistence,
  FacebookAuthProvider,
  signInWithCredential,
  TwitterAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  query,
  limit,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  increment,
  onSnapshot,
} from 'firebase/firestore';

import {getStorage} from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER,
  APP_ID,
  MEASUREMENT_ID,
} from '@env';

const apiKey = API_KEY;
const authDomain = AUTH_DOMAIN;
const projectId = PROJECT_ID;
const storageBucket = STORAGE_BUCKET;
const messagingSenderId = MESSAGING_SENDER;
const appId = APP_ID;
const measurementId = MEASUREMENT_ID;

const app = initializeApp({
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
});

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const firestore = getFirestore(app);

const storage = getStorage(app);

export {
  firestore,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  storage,
  onAuthStateChanged,
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  query,
  limit,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  increment,
  onSnapshot,
  FacebookAuthProvider,
  signInWithCredential,
  TwitterAuthProvider,
};
