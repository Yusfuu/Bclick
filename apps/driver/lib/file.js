import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const getImage = async (image) => {
  // ImageManipulator
  const manipResult = await manipulateAsync(
    image.uri,
    [
      {
        resize: {
          width: image.width * 0.1,
          height: image.height * 0.1,
        },
      },
    ],
    { compress: 1, format: SaveFormat.PNG }
  );

  // convert to blob
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', manipResult.uri, true);
    xhr.send(null);
  });

  return blob;
};
