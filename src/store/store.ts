import { configureStore } from '@reduxjs/toolkit'
import productsSlice from './slices/productsSlice'
import postSlice from './slices/postSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        products : productsSlice,
        post : postSlice
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']