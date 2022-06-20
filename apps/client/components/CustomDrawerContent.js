import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';

import { Text } from 'react-native';

export const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <AntDesign name='user' size={24} color='black' />
      <Text>CustomDrawerContent</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
