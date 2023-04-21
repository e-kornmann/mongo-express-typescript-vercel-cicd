import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';



export const store = configureStore({
    reducer: {
        user: userReducer,
        booking: bookingReducer
    },
});
