import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { geohashForLocation } from 'geofire-common';

export const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';

TaskManager.defineTask(TASK_FETCH_LOCATION, async ({ data: { locations }, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  const [location] = locations;

  const { longitude, latitude } = location.coords;
  const geohash = geohashForLocation([latitude, longitude]);

  const geo = {
    longitude,
    latitude,
    geohash,
  }


  console.log('Received new locations', geo);
});

export const startBackgroundLocationUpdates = async () => {
  await Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
    accuracy: Location.Accuracy.Highest,
    distanceInterval: 0, // minimum change (in meters) betweens updates
    deferredUpdatesInterval: 1000, // minimum interval (in milliseconds) between updates
    // foregroundService is how you get the task to be updated as often as would be if the app was open
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: "Location",
      notificationBody: "Location tracking in background",
      notificationColor: "#fff",
    },
  });
}

export const stopBackgroundUpdate = async () => {
  const hasStarted = await Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION);
  if (hasStarted) {
    await Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION)
    console.log("Location tacking stopped")
  }
}

export const requestPermissions = async () => {
  const foreground = await Location.requestForegroundPermissionsAsync();
  if (foreground.granted) await Location.requestBackgroundPermissionsAsync();
}

export const getLocationPermissions = async () => {
  const { status: foregroundStatus } = await Location.getForegroundPermissionsAsync();
  const { status: backgroundStatus } = await Location.getBackgroundPermissionsAsync();
  console.log({ foregroundStatus, backgroundStatus });
  return { foregroundStatus, backgroundStatus };
}