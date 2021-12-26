import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Device, Theme } from '../../constants'

export interface TopMenuReducer {
  activeTab: string | number
}

const initialState: TopMenuReducer = {
  activeTab: 1
}

export const topMenuReducer = createSlice({
  name: 'topMenuReducer',
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<string | number>) => {
      state.activeTab = action.payload
    },
  },
})

export const { changeTab } = topMenuReducer.actions

export default topMenuReducer.reducer
