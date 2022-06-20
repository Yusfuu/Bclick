import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { login, logout, selectUser } from '../app/features/user/userSlice';
import { auth } from '../firebase/client';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCredential) => {
      if (userCredential) {
        const user = {
          email: userCredential.email || null,
          uid: userCredential.uid || null,
          lastLoginAt: userCredential.lastLoginAt || null,
          displayName: userCredential.displayName || null,
          photoURL: userCredential.photoURL || null,
          phoneNumber: userCredential.phoneNumber || null,
          createdAt: userCredential.createdAt || null,
        };
        dispatch(login(user));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};
