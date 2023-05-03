import {createSlice} from '@reduxjs/toolkit'
import {RootState} from '../store'


const getThemeLocalStorage = ( ) => {
  const dataScheme = localStorage.getItem('scheme')
  return dataScheme ? JSON.parse(dataScheme) : 'light'
}

export interface themeSliceState {
  theme: 'light' | 'dark'
}

const initialState: themeSliceState = {
  theme: getThemeLocalStorage()
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
