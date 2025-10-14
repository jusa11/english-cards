import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const isShare = createSlice({
  name: 'share',
  initialState,
  reducers: {
    setShare: (state, action) => {
      return action.payload;
    },
  },
});

export const { setShare } = isShare.actions;
export const selectShare = (state) => state.isShare;
export default isShare.reducer;
