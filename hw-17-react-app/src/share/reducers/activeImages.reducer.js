import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const activeImagesSlice = createSlice({
  name: 'activeImages',
  initialState,
  reducers: {
    setActiveCards: (state, action) => {
    const arr = [...state];    
    //const arr = state.slice();     
      console.log(arr); 

      if (state.length === 0 || state.length % 2===0) { 
        arr.push(action.payload);
       //console.log(action.payload);
       console.log(arr);        
      } else {
        const last = arr[arr.length - 1];
        console.log(arr); 
        if (last.image === action.payload.image && last.index === action.payload.index) { 
          arr.push(action.payload)
          console.log(arr);          
        } else {
          arr.pop();
          console.log(arr);         
        }
      }
      return [...arr];
    },
  },
});

export const { setActiveCards } = activeImagesSlice.actions;
export default activeImagesSlice.reducer;
