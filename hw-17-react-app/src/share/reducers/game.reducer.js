
import { createSlice } from '@reduxjs/toolkit';

const initialState = {  
  gameTime: 0,
  clickCount: 0,
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
    resetGame: (state) => {
      return initialState;
    },
  },
});

export const { updateGameTime, updateClickCount, resetGame } = gameSlice.actions;
export default gameSlice.reducer;