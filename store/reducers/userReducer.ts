import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserReducer {
  isAuth: boolean
  user?: UserProfileInterface
}

export interface UserProfileInterface {
  id: string
  name: string
  email?: string
  access?: {
    token: string
    refreshToken: string
  }
  count?: {
    followers?: number
    follow?: number
    posts?: number
  }
}

const initialState: UserReducer = {
  isAuth: false,
  user: {
    id: '1234',
    name: 'Thanarak Chaisri',
    count: {
      follow: 4351,
      followers: 34225
    }
  },
}

export const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    onAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
})

export const { onAuth } = userReducer.actions

export default userReducer.reducer
