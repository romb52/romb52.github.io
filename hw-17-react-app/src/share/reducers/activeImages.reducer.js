import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const activeImagesSlice = createSlice({
  name: 'activeImages',
  initialState,
  reducers: {
    setActiveCards: (state, action) => {
      const arr = [...state];
     // console.log(JSON.stringify(arr));
     //console.log(action.payload);
      if (state.length === 0 || state.length % 2 === 0) {
        arr.push(action.payload); 
        //console.log(arr);
      } else {
        const last = arr[arr.length - 1];
        //console.log(arr);  
        
        if (last && last.image === action.payload.image && last.index != action.payload.index) {
          arr.push(action.payload);
          //console.log(arr);        
        } else {   
          arr.push(action.payload);  
          //arr.pop();          
        }
      }
      return [...arr];
    },
    resetActiveCards: (state) => {     
      state.pop();
      state.pop();
    },      
  },
});

export const { setActiveCards, resetActiveCards } = activeImagesSlice.actions;
export default activeImagesSlice.reducer;
