import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Device, Theme } from '../../constants'

export interface TopMenuReducer {
  activeTab: string | number
  isSlide: boolean
}

const initialState: TopMenuReducer = {
  activeTab: 1,
  isSlide: false,
}

export const topMenuReducer = createSlice({
  name: 'topMenuReducer',
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<string | number>) => {
      state.activeTab = action.payload
    },
    onShowSlide: (state, action: PayloadAction<boolean>) => {
      state.isSlide = action.payload
    },
  },
})

export const { changeTab, onShowSlide } = topMenuReducer.actions

export default topMenuReducer.reducer
