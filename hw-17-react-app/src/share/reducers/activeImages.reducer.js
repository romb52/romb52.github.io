import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const activeImagesSlice = createSlice({
  name: 'activeImages',
  initialState,
  reducers: {
    setActiveCards: (state, action) => {
      const arr = [...state];
      if (state.length === 0 || state.length % 2===0) { 
        arr.push(action.payload);
      } else {
        const last = arr[arr.length - 1];
        if (last === action.payload) { 
          arr.push(action.payload)
        } else {
          arr.pop();
        }
      }
      return [...arr];
    },
  },
});

export const { setActiveCards } = activeImagesSlice.actions;
export default activeImagesSlice.reducer;
