import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/theme.reducer';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});