import { configureStore } from '@reduxjs/toolkit'
import activeImagesReducer from './reducers/activeImages.reducer'
import imagesReducer from './reducers/images.reducer'


export const store = configureStore({
  reducer: {
    images: imagesReducer,
    activeImages: activeImagesReducer
  },
})