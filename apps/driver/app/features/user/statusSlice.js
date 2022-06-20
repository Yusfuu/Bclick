import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = statusSlice.actions;

export const selectStatus = (state) => state.status.status;

export default statusSlice.reducer;
