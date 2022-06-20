import { geohashForLocation } from 'geofire-common';

export const geo = ({ latitude, longitude }) => {
  const hash = geohashForLocation([latitude, longitude]);
  const location = { latitude, longitude, hash };
  return location;
};
