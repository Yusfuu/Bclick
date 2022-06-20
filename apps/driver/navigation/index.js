import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import AppLoading from 'expo-app-loading';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const SettingStack = createNativeStackNavigator();

const SettingStackScreens = () => (
  <SettingStack.Navigator>
    <SettingStack.Screen name='Setting' component={SettingScreen} />
    <SettingStack.Screen
      name='Profile'
      options={{
        headerTitle: 'Edite Profile',
      }}
      component={ProfileScreen}
    />
  </SettingStack.Navigator>
);
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
    }}>
    <Tab.Screen
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? 'compass' : 'compass-outline'}
            size={size}
            color={color}
          />
        ),
      }}
      name='Home'
      component={HomeScreen}
    />
    <Tab.Screen
      name='Root'
      options={{
        headerShown: false,
        title: 'Settings',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={size}
            color={color}
          />
        ),
      }}
      component={SettingStackScreens}
    />
    <Tab.Screen
      name='Notifications'
      options={{
        tabBarBadge: 3,
        title: 'Notifications',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? 'notifications' : 'notifications-outline'}
            size={size}
            color={color}
          />
        ),
      }}
      component={SettingStackScreens}
    />
  </Tab.Navigator>
);

const RootNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <AppLoading />;
  }

  if (user) {
    return <TabNavigator />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SignIn'
        component={SignInScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
