
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameTime: 0,
  clickCount: 0,
  boardSize: 4,
  bestTime: localStorage.getItem('bestTime') || null,
  minStep: localStorage.getItem('minStep') || null,
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
      if (!state.bestTime || newTime < state.bestTime) {
        state.bestTime = newTime;
        localStorage.setItem('bestTime', newTime);
      }
    },
    updateMinStep: (state, action) => {
      const newStep = action.payload;
      if (!state.minStep || newStep < state.minStep) {
        state.minStep = newStep;
        localStorage.setItem('minStep', newStep);
      }
    },
  },
});

export const { updateGameTime, updateClickCount, setBoardSize, updateBestTime, updateMinStep } = gameSlice.actions;
export default gameSlice.reducer;