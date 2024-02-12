
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameTime: 0,
  clickCount: 0,
  boardSize: 4,
  bestTime4: localStorage.getItem('bestTime4') || null,
  minStep4: localStorage.getItem('minStep4') || null,
  bestTime3: localStorage.getItem('bestTime3') || null,
  minStep3: localStorage.getItem('minStep3') || null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {

    updateGameTime: (state, action) => {
      state.gameTime = action.payload;   
    },

    updateClickCount: (state, action) => {
      state.clickCount = action.payload;
    },
    setBoardSize: (state, action) => {
      state.boardSize = action.payload;
    },
    updateBestTime: (state, action) => {
      const newTime = action.payload;
      const key = `bestTime${state.boardSize}`; // визначаємо ключ залежно від розміру дошки
      if (!state[key] || newTime < state[key]) {
        state[key] = newTime;
        localStorage.setItem(key, newTime);
      }
    },
    updateMinStep: (state, action) => {
      const newStep = action.payload;
      const key = `minStep${state.boardSize}`; // визначаємо ключ залежно від розміру дошки
      if (!state[key] || newStep < state[key]) {
        state[key] = newStep;
        localStorage.setItem(key, newStep);
      }
    },
  },
});

export const { updateGameTime, updateClickCount, setBoardSize, updateBestTime, updateMinStep } = gameSlice.actions;
export default gameSlice.reducer;