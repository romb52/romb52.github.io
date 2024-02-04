
import { createSlice } from '@reduxjs/toolkit';

const initialState = {  
  gameTime: 0,
  clickCount: 0,
  boardSize:4
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
  },
});

export const { updateGameTime, updateClickCount, setBoardSize } = gameSlice.actions;
export default gameSlice.reducer;