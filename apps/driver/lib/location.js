import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

export const TASK_FETCH_LOCATION = 'TASK_FETCH_LOCATION';

export const stopBackgroundLocationTask = async () => {
  Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION).then((value) => {
    if (value) {
      Location.stopLocationUpdatesAsync(TASK_FETCH_LOCATION);
    }
  });
};

export const startBackgroundLocationTask = async () => {
  Location.startLocationUpdatesAsync(TASK_FETCH_LOCATION, {
    accuracy: Location.Accuracy.Balanced,
    distanceInterval: 1, // minimum change (in meters) betweens updates
    deferredUpdatesInterval: 5000, // minimum interval (in milliseconds) between updates
    // foregroundService is how you get the task to be updated as often as would be if the app was open
    foregroundService: {
      notificationTitle: 'Using your location',
      notificationBody:
        'To turn off, go back to the app and switch something off.',
    },
  });
};

export const getStatusLocation = async () => {
  const hasStart = Location.hasStartedLocationUpdatesAsync(TASK_FETCH_LOCATION);
  const isTaskDefined = TaskManager.isTaskDefined(TASK_FETCH_LOCATION);

  const [hasStartedLocationUpdates, isTaskDefinedLocation] = await Promise.all([
    hasStart,
    isTaskDefined,
  ]);

  return {
    hasStartedLocationUpdates,
    isTaskDefinedLocation,
  };
};
