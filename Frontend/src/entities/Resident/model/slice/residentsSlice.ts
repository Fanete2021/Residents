import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Resident, ResidentSchema} from '../types/resident';
import {loadResidents} from "entities/Resident";

const initialState: ResidentSchema = {
  data: [],
  isLoading: false,
  error: ''
};

export const residentsSlice = createSlice({
  name: 'residents',
  initialState,
  reducers: {
    setResidents: (state, action: PayloadAction<Resident[]>) => {
      state.data = action.payload;
    },
    addResident: (state, action: PayloadAction<Resident>) => {
      state.data.push(action.payload);
    },
    updateResident: (state, action: PayloadAction<Resident>) => {
      const index = state.data.findIndex(resident => resident._id === action.payload._id);
      state.data[index] = action.payload;
    },
    deleteResident: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(res => res._id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadResidents.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loadResidents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(loadResidents.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { actions: residentsActions } = residentsSlice;
export const { reducer: residentsReducer } = residentsSlice;