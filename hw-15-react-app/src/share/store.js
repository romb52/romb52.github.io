import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducers/auth.reducer'
import errorsReducer from './reducers/errors.reducer'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorsReducer
  },
})