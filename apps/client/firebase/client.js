import { initializeApp, getApp, getApps } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  setDoc,
  onSnapshot,
} from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries
// replace with your own config object
const firebaseConfig = {};

// Initialize Firebase
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth();
export const db = getFirestore();

export const register = async (email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export const login = async (email, password) => {
  // const querySnapshot = await getDocs(collection(db, "users"));
  // console.log('getDocs4');
  // const querySnapshot = await getDocs(doc(db, "users"));
  // querySnapshot.forEach(doc => {
  //   console.log(doc.data());
  // });
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  // let userId = auth.currentUser.uid

  // console.log('ff');
  // const q = query(collection(db, "users"));

  // const querySnapshot = await getDocs(q);
  // let arr = []
  // querySnapshot.forEach((doc) => arr.push(doc.id));

  // console.log(userId);
  // console.log(arr);
  // if (arr.includes(userId)) {
  //   console.log('yo');
  // }
  // const docSnap = await getDoc(docRef);
  // console.log('ee');

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {p
  //   // doc.data() will be undefined in this case
  //   console.log("No such document!");
  // }
  // const { user } = await signInWithEmailAndPassword(auth, email, password);
  // let userId = auth.currentUser.uid
  // console.log('UserID:');
  // console.log(userId);
  // let UserRole = { email: user.email, uid: userId, role: "delivery" }
  // console.log(UserRole);
  // console.log(user);
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data().uid , user.uid)
  // });

  return user;
};

export const SignInAnonymously = async () => {
  // sign in ano
  let { user } = await signInAnonymously(auth);
  return user;
};

export const getUsers = async () => {
  let data = await getDocs(collection(db, 'users'));
  data.forEach((e) => {
    console.log(e.data());
  });
};

export const getDeliverys = async (fn) => {
  const q = query(collection(db, 'positions'), where('geopoint', '!=', null));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        lan: doc.data()?.geopoint.latitude,
        lat: doc.data()?.geopoint.latitude,
      });
    });
    fn(users);
    // console.log('Current users in CA: ', users);
  });
  return unsubscribe;
};

export const getAllusers = async () => {
  let arr = [];
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });
  return arr;
};

export const logout = async () => {
  console.log('logout');
  signOut(auth);
};

export const signout = async () => {
  return await signOut(auth);
};

export const updateUser = async (user) => {
  const { uid } = user;
  const document = await setDoc(doc(db, 'users', uid), user);
  return document;
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
