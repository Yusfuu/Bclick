import { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import MapView, { Marker } from 'react-native-maps';
import { MotiView, MotiText } from 'moti';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, setStatus } from '../app/features/user/statusSlice';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { geo } from '../lib/geo';
import { updateUserLocation } from '../firebase/client';
import { getStatusLocation, TASK_FETCH_LOCATION } from '../lib/location';

const initialRegion = {
  latitude: 32.2932031,
  longitude: -9.1666516,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
};

TaskManager.defineTask(
  TASK_FETCH_LOCATION,
  async ({ data: { locations }, error }) => {
    if (error) {
      console.error(error);
      return;
    }
    const [location] = locations;
    try {
      const geolocation = geo(location.coords);
      updateUserLocation(geolocation);
    } catch (err) {
      console.error(err);
    }
  }
);

let watcherPosition = null;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const [myLocation, setMyLocation] = useState(null);

  const start = async () => {
    if (status === 'loading') return;

    if (status === 'working') {
      //  when you're done, stop it
      const { hasStartedLocationUpdates } = await getStatusLocation();

      if (hasStartedLocationUpdates) {
        Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
      }
      dispatch(setStatus('loading'));
      await updateUserLocation(null);
      // remove watch position
      (await watcherPosition)?.remove();
      setMyLocation(null);
      return dispatch(setStatus('idle'));
    }

    dispatch(setStatus('loading'));

    // get permission to get location
    let permissions = await Location.requestForegroundPermissionsAsync();

    if (permissions.status !== 'granted') {
      // handle permission denied
      console.log('Permission to access location was denied');
      return;
    }

    if (Platform.OS === 'ios') {
      let old = null;
      watcherPosition = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 15,
          timeInterval: 60000,
        },
        (location) => {
          const currentGeo = geo(location.coords);
          if (old !== currentGeo.hash) {
            old = currentGeo.hash;
            updateUserLocation(currentGeo);
            setMyLocation(currentGeo);
          }
        }
      );

      return dispatch(setStatus('working'));
    }

    // start location updates in background
    Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 15, // minimum change (in meters) betweens updates
      deferredUpdatesInterval: 60000, // minimum interval (in milliseconds) between updates
      // foregroundService is how you get the task to be updated as often as would be if the app was open
      foregroundService: {
        notificationTitle: 'Using your location',
        notificationBody:
          'To turn off, go back to the app and switch something off.',
      },
    });

    dispatch(setStatus('working'));
  };

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Map initialRegion={initialRegion}>
        {myLocation && (
          <Marker
            coordinate={{
              latitude: myLocation.latitude,
              longitude: myLocation.longitude,
            }}>
            <View
              style={tw`h-5 w-5 border-2 border-white rounded-full bg-green-500 shadow-md`}
            />
          </Marker>
        )}
      </Map>
      <StatusBar>
        <StartWorkButton onStart={start} />
      </StatusBar>
    </View>
  );
};

const StatusBar = ({ children }) => {
  const status = useSelector(selectStatus);
  return (
    <MotiView
      style={tw`p-3 justify-center absolute bottom-5 w-full`}
      from={{
        translateY: 100,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      transition={{
        type: 'timing',
        delay: 500,
      }}>
      <View style={tw`bg-white p-5 shadow-lg rounded-2xl`}>
        <View style={tw`flex flex-row items-center justify-between`}>
          <Text style={tw`font-semibold text-base text-gray-900`}>Status</Text>
          {status === 'idle' && (
            <Text style={tw`font-semibold text-red-400 text-lg`}>Offline</Text>
          )}

          {status === 'loading' && (
            <Text style={tw`font-semibold text-blue-400 text-lg`}>
              Wait ...
            </Text>
          )}

          {status === 'working' && (
            <Text style={tw`font-semibold text-orange-400 text-lg`}>
              Waiting for orders
            </Text>
          )}
        </View>
        {children}
      </View>
    </MotiView>
  );
};

const StartWorkButton = ({ onStart }) => {
  const status = useSelector(selectStatus);

  return (
    <TouchableOpacity
      onPress={onStart}
      style={tw`w-full text-white py-5 mt-5 rounded-2xl shadow-md flex justify-center items-center ${
        status === 'working' ? 'bg-red-500' : 'bg-green-500'
      }`}>
      {status === 'loading' ? (
        <ActivityIndicator color='#fff' />
      ) : (
        <Text style={tw`text-white shadow-sm text-center font-bold`}>
          {status === 'working' ? 'Stop' : 'Start'} Work
        </Text>
      )}
    </TouchableOpacity>
  );
};

const Map = ({ initialRegion, children }) => {
  return (
    <MapView initialRegion={initialRegion} style={tw`h-full w-full`}>
      {children}
    </MapView>
  );
};

export default HomeScreen;
