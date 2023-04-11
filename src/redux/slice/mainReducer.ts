import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface mainState {
  value: boolean
}

const initialState: mainState = {
  value: false,
}

export const mainSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setValue: (state) => {
      state.value === true
    },
  },
})

export const {setValue} = mainSlice.actions
export default mainSlice.reducer
