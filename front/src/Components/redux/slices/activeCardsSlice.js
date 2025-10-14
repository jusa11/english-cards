import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCard: 0,
  activeWordId: null,
};

const activeCardsSlice = createSlice({
  name: 'activeCards',
  initialState,
  reducers: {
    setActiveCard: (state, action) => {
      state.currentCard = action.payload
    },
		setActiveWordId: (state, action)=> {
			state.activeWordId = action.payload
		}
  },
});

export const { setActiveCard, setActiveWordId } = activeCardsSlice.actions;
export const selectActiveCards = (state) => state.activeCard.currentCard;
export const selectActiveWordId= (state) => state.activeCard.activeWordId;
export default activeCardsSlice.reducer;
