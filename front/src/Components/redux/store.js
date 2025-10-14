import { configureStore } from '@reduxjs/toolkit';
import activeCardSlice from './slices/activeCardsSlice';
import isCollapsed from './slices/collapsedSlice';
import isShare from './slices/shareSlice';

export default configureStore({
  reducer: {
    activeCard: activeCardSlice,
    isCollapsed: isCollapsed,
    isShare: isShare,
  },
});
