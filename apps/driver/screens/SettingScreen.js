import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
  View,
} from 'react-native';
import tw from 'twrnc';
import { useUser } from '../hooks/useAuth';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { LoadAvatar } from '../components';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { signout } from '../firebase/client';

const navs = [
  {
    name: 'Notifications',
    icon: 'ios-notifications-outline',
  },
  { name: 'Help & Support', icon: 'help-circle' },
];

const SettingScreen = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <SettingHeader />

      <View style={tw`mt-5 mx-4`}>
        {navs.map(({ icon, name }) => (
          <Nav key={icon} name={name} icon={icon} />
        ))}
        <Logout />
      </View>
    </View>
  );
};

const Logout = () => {
  const logout = async () => await signout();

  return (
    <TouchableOpacity
      onPress={logout}
      style={tw`bg-white mt-3 flex-row items-center rounded-xl shadow-md p-4`}>
      <MaterialIcons name='logout' size={24} style={tw`text-red-400`} />
      <Text style={tw`text-red-400 font-semibold ml-3 text-base`}>Log out</Text>
    </TouchableOpacity>
  );
};

const Nav = ({ name, icon }) => {
  return (
    <TouchableOpacity
      style={tw`bg-white mt-3 flex-row items-center rounded-xl shadow-md p-4`}>
      <Ionicons name={icon} size={24} color='black' />
      <Text style={tw`text-gray-900 font-semibold ml-3 text-base`}>{name}</Text>
      <Feather
        name='chevron-right'
        style={tw`self-end ml-auto`}
        size={22}
        color='black'
      />
    </TouchableOpacity>
  );
};

const SettingHeader = () => {
  const user = useUser();
  return (
    <View style={tw`bg-white items-center mt-5`}>
      <View
        style={tw`border-2 border-orange-400 shadow-md p-1 w-24 h-24 rounded-full`}>
        <LoadAvatar url={user?.photoURL} />
      </View>

      <View style={tw`flex justify-center items-center mt-5`}>
        <Text style={tw`text-gray-900 capitalize text-lg font-semibold`}>
          {user.displayName}
        </Text>
        <Text style={tw`text-gray-600`}>{user?.email}</Text>
      </View>
      <EditeButton />
    </View>
  );
};

const EditeButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile')}
      style={tw`px-4 mt-5 py-2 flex-row justify-center items-center bg-orange-500 rounded-full`}>
      <Text style={tw`text-white capitalize text-base`}>Edit Profile</Text>
      <Feather name='chevron-right' size={22} color='white' />
    </TouchableOpacity>
  );
};

export default SettingScreen;
