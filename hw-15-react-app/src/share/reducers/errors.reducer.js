import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  error: null
}

export const errorSlice = createSlice(
  {
    name: 'error',
    initialState,
    reducers: {
      setError: (state, action) => {
        state.error = action.payload.errors || action.payload.message || null;
        console.log( state.error);
      },
      clearErrors: (state) => {
        state.error = null;
      }
    }
  }
)

export const { setError, clearErrors } = errorSlice.actions;

export default errorSlice.reducer; 