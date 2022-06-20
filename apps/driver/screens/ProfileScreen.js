import React, { useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import tw from 'twrnc';
import { MotiView, useAnimationState } from 'moti';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateUserFirestore, uploadPicture } from '../firebase/client';
import { useImage } from '../hooks/useImage';
import { useUser } from '../hooks/useAuth';
import { Feather } from '@expo/vector-icons';
import { login } from '../app/features/user/userSlice';
import { useDispatch } from 'react-redux';

const regexPhone = /^[0-9]{10}$/g;

const ProfileScreen = () => {
  const user = useUser();
  const dispatch = useDispatch();
  console.log(user);
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');

  const fields =
    name.trim() === '' || email.trim() === '' || phone.trim() === '';

  const isEquel =
    user.displayName === name &&
    user.email === email &&
    user.phoneNumber === phone;

  const disabled = isEquel || fields || !regexPhone.test(phone);

  const onPress = async () => {
    const u = {
      displayName: name,
      phoneNumber: phone,
      email,
    };

    await updateUserFirestore(u);

    const snap = {
      ...user,
      ...u,
    };

    dispatch(login(snap));
  };

  return (
    <SafeAreaView style={tw`flex-1 items-center bg-white`}>
      <ScrollView style={tw`w-full`}>
        <Avatar />
        <Form>
          <Text style={tw`capitalize text-center text-xl mb-5`}>
            personal information
          </Text>

          <FormInput
            label='email'
            disabled
            keyboardType='email-address'
            value={email}
          />
          <FormInput
            placeholder='John Doe'
            onChangeText={(val) => setName(val)}
            label='full name'
            value={name}
          />
          <FormInput
            placeholder='06xxxxxxxx'
            keyboardType='phone-pad'
            onChangeText={(val) => setPhone(val)}
            label='phone number'
            value={phone}
          />
          <UpdateButton disabled={disabled} onPress={onPress} />
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

const FormInput = ({
  label,
  value,
  keyboardType,
  secure = false,
  disabled = false,
  onChangeText,
  placeholder,
}) => {
  return (
    <View style={tw`w-full shadow-sm mb-4`}>
      <Text style={tw`capitalize mb-2 text-base text-gray-800`}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        autoCorrect={false}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        defaultValue={value}
        autoComplete='off'
        style={tw`${
          disabled ? 'opacity-50' : ''
        } bg-white  text-gray-900 border border-slate-300 w-full h-14 px-4 rounded-xl`}
        editable={!disabled}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const UpdateButton = ({ onPress, disabled }) => {
  return (
    <View
      style={tw`${
        disabled ? 'opacity-50' : ''
      } w-full bg-orange-500 text-white py-5 my-5 rounded-2xl`}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={tw`flex justify-center items-center`}>
        <Text style={tw`text-white capitalize shadow-sm text-center font-bold`}>
          save changes
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Form = ({ children }) => {
  return (
    <KeyboardAwareScrollView style={tw`w-full p-3`}>
      {children}
    </KeyboardAwareScrollView>
  );
};

const Avatar = () => {
  const user = useUser();
  const dispatch = useDispatch();

  const { upload } = useImage();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadAvatar, setLoadAvatar] = useState(true);
  const [url, setUrl] = useState(
    user.photoURL || 'https://img.icons8.com/color/144/000000/test-account.png'
  );

  const onPress = async () => {
    const [file, uri] = await upload();
    if (file) {
      setImage(file);
      setUrl(uri);
    }
  };

  const onCancel = async () => {
    setUrl(
      user.photoURL ||
        'https://img.icons8.com/color/144/000000/test-account.png'
    );
    setImage(null);
  };

  const onSave = async () => {
    setLoading(true);
    const snap = {
      ...user,
      photoURL: await uploadPicture(image),
    };
    setLoading(false);
    setImage(null);
    dispatch(login(snap));
  };

  return (
    <View style={tw`flex flex-col items-center`}>
      <Pressable
        onPress={onPress}
        style={tw`mt-5 border-2 border-blue-400 shadow-md p-1 w-24 h-24 bg-white self-center rounded-full justify-center items-center`}>
        <Image
          source={{ uri: url }}
          style={tw`w-full h-full rounded-full`}
          resizeMode='cover'
          onLoad={() => {
            setLoadAvatar(false);
          }}
        />
        {loadAvatar && (
          <ActivityIndicator style={tw`absolute`} color='#fb923c' />
        )}
        <View
          style={tw`absolute border-4 border-white justify-center items-center w-8 h-8 bg-blue-400 left-16 top-16 rounded-full`}>
          <Feather name='camera' size={14} color='white' />
        </View>
      </Pressable>
      {loading ? (
        <ActivityIndicator color='#fb923c' style={tw`mt-4`} />
      ) : (
        image && (
          <View style={tw`flex-row mt-4`}>
            <TouchableScale
              onPress={onCancel}
              style={tw`bg-red-400 p-2 mr-2 rounded-md`}>
              <Text style={tw`text-white`}>Cancel</Text>
            </TouchableScale>
            <TouchableScale
              onPress={onSave}
              style={tw`bg-blue-400 p-2 ml-2 rounded-md`}>
              <Text style={tw`text-white`}>Change</Text>
            </TouchableScale>
          </View>
        )
      )}
    </View>
  );
};

function TouchableScale(props) {
  const { style, value, ...other } = props;

  const animationState = useAnimationState({
    from: {
      scale: 1,
    },
    bigger: {
      scale: value ? [value + 0.05, value] : [1.15, 1.1],
    },
  });

  const pressedIn = () => {
    animationState.transitionTo('bigger');
  };
  const pressedOut = () => {
    animationState.transitionTo('from');
  };
  return (
    <Pressable {...other} onPressIn={pressedIn} onPressOut={pressedOut}>
      <MotiView
        style={style}
        state={animationState}
        transition={{
          type: 'timing',
        }}>
        {props.children}
      </MotiView>
    </Pressable>
  );
}

export default ProfileScreen;
