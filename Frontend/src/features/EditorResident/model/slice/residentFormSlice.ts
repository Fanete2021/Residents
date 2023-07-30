import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {createResident, deleteResident, ResidentFormSchema, updateResident} from "features/EditorResident";
import {City} from "entities/City";
import {Group, Resident} from "entities/Resident";

const initialState: ResidentFormSchema = {
  resident: {
    _id: '',
    name: '',
    city: null,
    groups: []
  },
  isLoading: false,
  error: ''
};

export const residentFormSlice = createSlice({
  name: 'residentForm',
  initialState,
  reducers: {
    setResident: (state, action: PayloadAction<Resident>) => {
      state.resident = action.payload;
      state.error = '';
    },
    setName: (state, action: PayloadAction<string>) => {
      state.resident.name = action.payload;
    },
    setCity: (state, action: PayloadAction<City>) => {
      state.resident.city = action.payload;
    },
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.resident.groups = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createResident.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(createResident.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createResident.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateResident.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateResident.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateResident.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteResident.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(deleteResident.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteResident.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { actions: residentFormActions } = residentFormSlice;
export const { reducer: residentFormReducer } = residentFormSlice;