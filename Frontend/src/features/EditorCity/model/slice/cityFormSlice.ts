import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from "entities/City";
import {CityFormSchema, createCity, updateCity} from "features/EditorCity";

const initialState: CityFormSchema = {
  city: {
    _id: '',
    name: '',
    data: ''
  },
  isLoading: false,
  error: ''
};

export const cityFormSlice = createSlice({
  name: 'cityForm',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
      state.error = '';
    },
    setName: (state, action: PayloadAction<string>) => {
      state.city.name = action.payload;
    },
    setData: (state, action: PayloadAction<string>) => {
      state.city.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCity.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(createCity.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(createCity.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(updateCity.pending, (state, action) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(updateCity.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateCity.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

export const { actions: cityFormActions } = cityFormSlice;
export const { reducer: cityFormReducer } = cityFormSlice;