import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../Slices/userAuthSlice";
import postReducer from "../Slices/userPostSlice";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: {
        user: userReducer,
        posts: postReducer,
    },
});

export const appDispatch: AppDispatch = store.dispatch;
export const rootState: () => RootState = store.getState;
