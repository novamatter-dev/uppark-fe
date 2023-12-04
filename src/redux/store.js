import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  authApi,
  usersApi,
  carsApi,
  parkingsApi,
  notificationsApi,
  walletsApi,
} from "../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authReducer from "./features/auth/authSlice";
import userReducer from "./features/users/userSlice";
import carsReducer from "./features/cars/carsSlice";
import parkingsReducer from "./features/parkings/parkingsSlice";
import notificationReducer from "./features/notifications/notificationSlice";
import { rtkQueryErrorLogger } from "./err";

const reducers = {
  [authApi.reducerPath]: authApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [carsApi.reducerPath]: carsApi.reducer,
  [parkingsApi.reducerPath]: parkingsApi.reducer,
  [notificationsApi.reducerPath]: notificationsApi.reducer,
  [walletsApi.reducerPath]: walletsApi.reducer,
  auth: authReducer,
  users: userReducer,
  cars: carsReducer,
  parkings: parkingsReducer,
  notification: notificationReducer,
};

const combinedReducers = combineReducers(reducers);

const rootReducer = (state, action) => {
  return combinedReducers(state, action);
};

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      rtkQueryErrorLogger,
      authApi.middleware,
      usersApi.middleware,
      carsApi.middleware,
      parkingsApi.middleware,
      notificationsApi.middleware,
      walletsApi.middleware
    ),
});
export const AppDispatch = typeof store.dispatch;
export const RootState = combinedReducers;
