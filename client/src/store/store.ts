import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({user: userReducer, booking: bookingReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
    },
);


export const persistor = persistStore(store)