import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './reducers/postsReducer'
import themeReducer from './reducers/themeReducer'
import topMenuReducer from './reducers/topMenuReducer'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    topMenu: topMenuReducer,
    posts: postsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
