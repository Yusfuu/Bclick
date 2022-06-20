import { useCallback, useEffect, useState } from 'react';
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from 'expo-image-picker';
import { getImage } from '../lib/file';

export const useImage = () => {
  const [status, setStatus] = useState('idle');
  const [permission, setPermission] = useState(null);

  const upload = useCallback(async () => {
    let pickerResult = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (pickerResult.cancelled === true) {
      return [null, null];
    }
    setStatus('pending');
    const image = await getImage(pickerResult);
    setStatus('success');
    return [image, pickerResult.uri];
  }, []);

  useEffect(() => {
    (async () => {
      let permissionResult = await requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        setPermission('Permission to access camera roll is required!');
        return;
      }
    })();
  }, []);

  return { status, permission, upload };
};
