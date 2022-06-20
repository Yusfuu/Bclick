import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { login, logout, selectUser } from '../app/features/user/userSlice';
import { auth, getUserById } from '../firebase/client';
import { useDispatch, useSelector } from 'react-redux';

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userCredential) => {
      if (userCredential) {
        console.log('userCredential 💖💖');
        const { uid } = userCredential;
        console.log(uid);
        const snap = await getUserById(uid);
        setLoading(false);
        console.log(snap);
        dispatch(login(userCredential));
      } else {
        setLoading(false);
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export const useUser = () => {
  const user = useSelector(selectUser);
  return user;
};
