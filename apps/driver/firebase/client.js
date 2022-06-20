import { initializeApp, getApp, getApps } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  collection,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries
// replace with your own config object
const firebaseConfig = {};

// Initialize Firebase
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

export const register = async (email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export const login = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  console.log(result);
  return result.user;
};

export const signout = async () => {
  return await signOut(auth);
};

export const updateUserLocation = async (geopoint) => {
  const uid = auth.currentUser.uid;
  const document = await setDoc(doc(db, 'positions', uid), { geopoint });
  return document;
};

export const deleteUserLocation = async () => {
  const uid = auth.currentUser.uid;
  const document = await deleteDoc(doc(db, 'positions', uid));
  return document;
};

export const updateUserFirestore = async (user) => {
  const uid = auth.currentUser.uid;
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, user);
  return userRef;
};

export const uploadPicture = async (file) => {
  const uid = auth.currentUser.uid;
  const storageRef = ref(storage, `avatars/${uid}`);
  const snapshot = await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(ref(storage, snapshot.ref.fullPath));
  await updateUserFirestore({ photoURL });
  return photoURL;
};

export const getUserById = async (uid) => {
  const document = doc(db, 'users', uid);
  const snap = await getDoc(document);
  return snap.data();
};

export const getDeliverys = async () => {
  const q = query(collection(db, 'positions'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        lan: doc.data().geopoint.latitude,
        lat: doc.data().geopoint.latitude,
      });
    });
    console.log('Current users in CA: ', users);
  });
  return unsubscribe;
};
