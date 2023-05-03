import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import  userReducer  from "./features/userSlice";
import { userApi } from "./api/userApi";

// The configureStore function from Redux Toolkit is used to create the Redux store.
export const store = configureStore({
  // The reducer configuration is set up, with the authApi.reducer assigned to the corresponding path.
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    userState:userReducer
  },
  // The Redux DevTools extension is enabled in development mode.
  devTools: process.env.NODE_ENV === "development",
  // The middleware configuration is set up, with the getDefaultMiddleware function used to get
  // the default middleware and the authApi.middleware added to the middleware stack.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware]),
});

// RootState and AppDispatch types are derived from the store to ensure type safety when using Redux with TypeScript.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// The useAppDispatch hook is created as a wrapper around the useDispatch hook from react-redux,
// with the AppDispatch type passed as a type parameter to enforce type safety.
export const useAppDispatch = () => useDispatch<AppDispatch>();

// The useAppSelector hook is created as a typed version of the useSelector hook from react-redux,
// with the RootState type passed as a type parameter to enforce type safety.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// This code sets up the Redux store using the configureStore function from Redux Toolkit. The authApi.reducer is added to the store's reducers, and the authApi.middleware is added to the store's middleware stack.

// The RootState and AppDispatch types are derived from the store to ensure type safety when using Redux with TypeScript. The useAppDispatch and useAppSelector hooks are created as typed versions of the useDispatch and useSelector hooks from react-redux, with the AppDispatch and RootState types passed as type parameters, respectively.
