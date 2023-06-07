import { configureStore } from "@reduxjs/toolkit";


import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';
import userReducer from "../features/userSlice/userSlice";
import requestReducer from "../features/requestSlice/requestSlice";




const rootReducer= combineReducers({
    user: userReducer,
    userRequest:requestReducer
});

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({

    reducer:persistedReducer,
});
