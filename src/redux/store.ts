import {configureStore} from '@reduxjs/toolkit'
import themeSlice from './slice/theme'
import {useDispatch} from 'react-redux'

export const store = configureStore({
  reducer: {
    themeSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
