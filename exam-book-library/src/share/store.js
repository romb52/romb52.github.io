import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './reducers/books.reducer'
import visitorReducer from './reducers/visitor.reducer'
import cardsReducer from './reducers/cards.reducer'


export const store = configureStore({
  reducer: {
    books: booksReducer,
    visitors: visitorReducer,
    cards: cardsReducer
  },
})