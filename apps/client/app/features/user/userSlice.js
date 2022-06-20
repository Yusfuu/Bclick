import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  userId: '',
  roomId: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    addUserId: (state, { payload }) => {
      state.userId = payload
    },
    addRoomId: (state, { payload }) => {
      state.roomId = payload
    },
    logout: (state) => {
      state.user = null
    },
  },
});

export const { login, logout, addUserId, addRoomId } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
