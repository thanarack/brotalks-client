import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './reducers/postsReducer'
import themeReducer from './reducers/themeReducer'
import topMenuReducer from './reducers/topMenuReducer'
import userReducer from './reducers/userReducer'
import videoReducer from './reducers/videoReducer'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    topMenu: topMenuReducer,
    posts: postsReducer,
    user: userReducer,
    video: videoReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
