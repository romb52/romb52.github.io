import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IErrorResponse {
  errors?: { body: string[] } | null;
  message?: string | null;
}
const initialState: IErrorResponse = {
  errors: null,
  message: null
}

export const errorSlice = createSlice(
  {
    name: 'error',
    initialState,
    reducers: {
      setError: (state, action: PayloadAction<IErrorResponse>) => {
        if (action.payload.errors) {
          state.errors = action.payload.errors
        }
        if (action.payload.message) {
          state.message = action.payload.message
        }
        if (!action.payload.errors && !action.payload.message) {
          state.errors = null;
          state.message = null;
        }

      },
      clearErrors: (state) => {
        state.errors = null;
        state.message = null;
      }
    }
  }
)

export const { setError, clearErrors } = errorSlice.actions;

export default errorSlice.reducer; 