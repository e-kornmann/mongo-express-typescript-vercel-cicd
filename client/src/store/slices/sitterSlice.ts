import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SitterType } from '../../types';


const emptySitterState = {
    id: "",
    name: "",
    gender: "",
    dateOfBirth: "",
    description: "",
    availability: [],
    image: ""
  
  } as SitterType;

  const sitterSlice = createSlice({
    name: 'sitter',
    initialState: emptySitterState,
    reducers: {
      setSitter: (state: SitterType, action: PayloadAction<SitterType>): SitterType => {
        return {
          ...state,
          id: action.payload.id,
          name: action.payload.name,
          gender: action.payload.gender,
          dateOfBirth: action.payload.dateOfBirth,
          description: action.payload.description,
          availability: action.payload.availability,
          image: action.payload.image,
      };
      
    },

    clearSelectedSitter: () => {
      return emptySitterState;
      },
    }, 
  });

  export const { setSitter, clearSelectedSitter } = sitterSlice.actions;
  export default sitterSlice.reducer;