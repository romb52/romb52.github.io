import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './reducers/books.reducer'


export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
})