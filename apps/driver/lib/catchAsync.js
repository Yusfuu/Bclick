export const catchAsync = async (promise) => {
  return promise
    .then((data) => [data, null])
    .catch((error) => Promise.resolve([null, error.message]));
};
