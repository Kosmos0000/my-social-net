import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersReducer";
import authReducer from "./reducers/authReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import searchReducer from "./reducers/searchReducer";


export const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: authReducer,
        search: searchReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector