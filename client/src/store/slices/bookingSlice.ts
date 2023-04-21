import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InsertedBooking } from '../../types';

const emptybookingState = {
    sitterId: "empty", 
    sitterName: "empty", 
    dateOfBooking: "empty", 
    dayNameOfBooking: "empty", 
    startTime: "empty", 
    endTime: "empty", 
    price: 0, 
  } as InsertedBooking;
  
const bookingSlice = createSlice({
    name: 'booking',
    initialState: emptybookingState,
    reducers: {
      setSitter: (state: InsertedBooking, action: PayloadAction<InsertedBooking>): InsertedBooking => {
        return {
          ...state,
          sitterId: action.payload.sitterId,
          sitterName: action.payload.sitterName,
      };
    },
      setBookingData: (state: InsertedBooking, action: PayloadAction<InsertedBooking>) => {
       return {
        ...state,
         dateOfBooking: action.payload.dateOfBooking,
         dayNameOfBooking: action.payload.dayNameOfBooking,
         startTime: action.payload.startTime,
         endTime: action.payload.endTime,
         };
      },     
      setPrice: (state: InsertedBooking, action: PayloadAction<InsertedBooking>): InsertedBooking => {
        return {
          ...state,
          price: action.payload.price,
      };
    },
      clear: (state) => {
        localStorage.removeItem('booking');
        return emptybookingState;
      },
    }, 
  });
  
  export const { setSitter, setBookingData, setPrice, clear } = bookingSlice.actions;
  export default bookingSlice.reducer;