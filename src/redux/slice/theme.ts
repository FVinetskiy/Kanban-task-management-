import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store'

export interface themeSliceState {
  theme: 'light' | 'dark'
}

const initialState: themeSliceState = {
  theme: 'light',
}

export const themeSlice = createSlice({
  name: 'boards/theme',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload
    },
  },
})

export const {setTheme} = themeSlice.actions
export default themeSlice.reducer

export const selectTheme = (state: RootState) => state.themeSlice
