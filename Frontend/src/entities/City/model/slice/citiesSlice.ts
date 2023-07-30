import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {City, CitySchema, loadCities} from "entities/City";

const initialState: CitySchema = {
  data: [],
  isLoading: false,
  error: ''
};

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<City[]>) => {
      state.data = action.payload;
    },
    addCity: (state, action: PayloadAction<City>) => {
      state.data.push(action.payload);
    },
    updateCity: (state, action: PayloadAction<City>) => {
      const index = state.data.findIndex(city => city._id === action.payload._id);
      state.data[index] = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCities.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loadCities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(loadCities.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { actions: citiesActions } = citiesSlice;
export const { reducer: citiesReducer } = citiesSlice;