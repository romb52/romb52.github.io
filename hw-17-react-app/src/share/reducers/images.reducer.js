import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const MAX_CARDS_COUNT = 6;
const MIN_CARDS_COUNT = 1;

export const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    getImagesArr: (state) => {   
      const arr = [];
      while (arr.length < 12) {
        const i = Math.floor(Math.random() * MAX_CARDS_COUNT + MIN_CARDS_COUNT);
        const src = `./images/${i}.jpg`;
        arr.length <= 2 && arr.push(src);
        if (arr.length > 2) {
          const filter = arr.filter((item) => item === src);
          if (filter.length < 2) {
            arr.push(src);
          }
        }
      }  
      return [...arr];
    },
  },
});



export const { getImagesArr } = imagesSlice.actions;
export default imagesSlice.reducer;
