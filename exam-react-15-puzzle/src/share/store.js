import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './reducers/theme.reducer';
import gameReducer from './reducers/game.reducer';
import soundReducer from './reducers/sound.reducer';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    game: gameReducer, 
    sound: soundReducer
  },
});