import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Device, Theme } from '../../constants'

export interface ItemsReducer {
  items: Array<[]>
  hasNextPage: boolean
  isNextPageLoading: boolean
  fullPostIndex: Array<[string | number]> // Keep data id that user clicked readmore.
  total: number
}

const initialState: ItemsReducer = {
  items: [],
  hasNextPage: true,
  isNextPageLoading: false,
  fullPostIndex: [],
  total: 2,
}

export const postsReducer = createSlice({
  name: 'postsReducer',
  initialState,
  reducers: {
    onSetItems: (state, action: PayloadAction<Array<[]>>) => {
      state.items = action.payload
    },
    onHasNextPage: (state, action: PayloadAction<boolean>) => {
      state.hasNextPage = action.payload
    },
    onIsNextPageLoading: (state, action: PayloadAction<boolean>) => {
      state.isNextPageLoading = action.payload
    },
    onFullPostIndex: (state, action: PayloadAction<any>) => {
      const getExitsIndex = state.fullPostIndex.findIndex(
        (v: any) => v === action.payload
      )
      if (getExitsIndex === -1) {
        state.fullPostIndex.push(action.payload)
      }
    },
  },
})

export const {
  onSetItems,
  onHasNextPage,
  onIsNextPageLoading,
  onFullPostIndex,
} = postsReducer.actions

export default postsReducer.reducer
