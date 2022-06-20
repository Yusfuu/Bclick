import { View, Image, Text } from 'react-native';
import BclickLogo from '../assets/logo.png';
import tw from 'twrnc';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { login, updateUser } from '../firebase/client';
import { FormInput, SigninButton } from '../components/index';
import { catchAsync } from '../lib/catchAsync';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginUser, addUserId } from '../app/features/user/userSlice';

const enabel = (email, password) => {
  return (
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi.test(email.trim()) &&
    password.trim().length > 0
  );
};

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  let dispatch = useDispatch()

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    const [userCredential, userError] = await catchAsync(
      login(email, password)
    );

    if (userError) {
      setError('Invalid email or password');
      setLoading(false);
      return;
    }

    const user = {
      email: userCredential.email || null,
      uid: userCredential.uid || null,
      lastLoginAt: userCredential.lastLoginAt || null,
      displayName: userCredential.displayName || null,
      photoURL: userCredential.photoURL || null,
      phoneNumber: userCredential.phoneNumber || null,
      createdAt: userCredential.createdAt || null,
    };

    await AsyncStorage.setItem('userId', userCredential.uid)
    dispatch(addUserId(userCredential.uid))

    await updateUser(user);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={tw`flex-1 justify-center items-center bg-white`}>
      <View style={tw`w-full flex-1 justify-center items-center p-4`}>
        <View style={tw`w-full justify-center items-center`}>
          <View style={tw`overflow-hidden rounded-lg w-32 h-32`}>
            <Image
              style={tw`rounded-full w-32 h-32`}
              source={BclickLogo}
              resizeMode='contain'
            />
          </View>
        </View>

        {!!error && <Text style={tw`text-red-400 my-3 text-lg`}>{error}</Text>}
        <FormInput
          value={email}
          keyboardType='email-address'
          placeholder='example@bclick.com'
          label='email'
          onChangeText={(text) => setEmail(text)}
        />

        <FormInput
          value={password}
          secure
          placeholder='Enter password'
          label='password'
          onChangeText={(text) => setPassword(text)}
        />
        <SigninButton
          loading={loading}
          enabel={enabel(email, password)}
          onPress={handleLogin}
        />
        <Text style={tw`text-gray-700 mt-5 text-sm font-semibold`}>
          Forgot password ?
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;
