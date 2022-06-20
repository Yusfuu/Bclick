import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import statusReducer from './features/user/statusSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    status: statusReducer,
  },
});
