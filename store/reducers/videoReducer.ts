import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Device, Theme } from '../../constants'

export interface VideoReducer {
  playingVideoId: string
}

const initialState: VideoReducer = {
  playingVideoId: "1"
}

export const videoReducer = createSlice({
  name: 'videoReducer',
  initialState,
  reducers: {
    onPlayVideoId: (state, action: PayloadAction<string>) => {
      state.playingVideoId = action.payload
    },
  },
})

export const {
  onPlayVideoId
} = videoReducer.actions

export default videoReducer.reducer
