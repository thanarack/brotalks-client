import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Device, Theme } from '../../constants'

export interface ThemeReducer {
  device: string
  mode: string,
  isNavbar: boolean
}

const initialState: ThemeReducer = {
  device: Device.mobile,
  mode: Theme.light,
  isNavbar: true
}

export const themeReducer = createSlice({
  name: 'themeReducer',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      state.mode = action.payload
    },
  },
})

export const { changeTheme } = themeReducer.actions

export default themeReducer.reducer
