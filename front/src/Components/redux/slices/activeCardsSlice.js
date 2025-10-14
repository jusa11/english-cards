import { createSlice } from '@reduxjs/toolkit';

const initialState = 0;

const activeCardsSlice = createSlice({
  name: 'activeCards',
  initialState,
  reducers: {
    setActiveCard: (state, action) => {
      return action.payload;
    },
  },
});

export const { setActiveCard } = activeCardsSlice.actions;
export const selectActiveCards = (state) => state.activeCard;
export default activeCardsSlice.reducer;
