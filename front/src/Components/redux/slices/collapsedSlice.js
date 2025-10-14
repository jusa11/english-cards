import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const isCollapsed = createSlice({
  name: 'collapsed',
  initialState,
  reducers: {
    setCollapsed: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCollapsed } = isCollapsed.actions;
export const selectCollapsed = (state) => state.isCollapsed;
export default isCollapsed.reducer;
