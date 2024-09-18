import { configureStore } from "@reduxjs/toolkit";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const persistConfig={
    key:'root',
    storage
}

const rootreducer=combineReducers({
    user:userSlice,
})

const persistedReducer=persistReducer(persistConfig,rootreducer)

export const store=configureStore({
    reducer:persistedReducer
})
export const persistore=persistStore(store)