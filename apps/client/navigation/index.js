import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Button } from 'react-native';
import { CustomDrawerContent } from '../components';
import { Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import UserInfoScreen from '../screens/UserInfoScreen';
import tw from "twrnc";
import ChatList from '../screens/ChatListScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  const user = useAuth();

  // if(!user) return null

  return (
    <>
      {!user ? (
        <Stack.Navigator>
          <Stack.Screen
            name='SignIn'
            component={SignInScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      ) : (
        <>
          <Drawer.Navigator
            drawerContent={(prop) => <CustomDrawerContent {...prop} />}
            initialRouteName='HomeScreen'>
            <Drawer.Screen
              options={{
                drawerIcon: () => (
                  <Feather name='user' size={24} color='black' />
                ),
              }}
              name='Notifications'
              component={NotificationsScreen}
            />
            <Drawer.Screen
              options={{
                drawerItemStyle: { height: 0 }
              }}
              name='UserInfo'
              component={UserInfoScreen}
            />
            <Drawer.Screen
              options={{
                drawerIcon: () => (
                  <Feather name='user' size={24} color='black' />
                ),
              }}
              name='ChatList'
              component={ChatList}
            />
            <Drawer.Screen
              options={{
                // drawerItemStyle: { height: 0 }
                drawerIcon: () => (
                  <Feather name='user' size={24} color='black' />
                ),
              }}
              name='Chat'
              component={ChatScreen}
            />
            <Drawer.Screen
              options={{
                drawerIcon: () => (
                  <Feather name='user' size={24} color='black' />
                ),
              }}
              name='Profile'
              component={ProfileScreen}
            />
            <Drawer.Screen
              name='HomeScreen'
              component={HomeScreen}
              options={{ headerShown: true }}
            />
          </Drawer.Navigator>
        </>
      )}
    </>
  );
};

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title='Go back home' />
    </View>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
