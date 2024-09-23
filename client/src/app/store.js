import { configureStore , combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from "./service/userSlice";

import storage from "redux-persist/lib/storage";


const rootReducers = combineReducers({
    user : userReducer,
})


const persistConfig = {
    key: 'root',
    storage,
    version: 1,
  };

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);