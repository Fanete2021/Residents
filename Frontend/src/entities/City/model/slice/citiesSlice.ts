import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../types/city';

const initialState: City[] = [
  {
    "id": 1,
    "name": "Москва",
    "data": "10000000"
  },
  {
    "id": 2,
    "name": "Воронеж",
    "data": "1000000"
  },
  {
    "id": 3,
    "name": "Санкт-Петербург",
    "data": "3000000"
  }
];

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {

  }
});

export const { actions: citiesActions } = citiesSlice;
export const { reducer: citiesReducer } = citiesSlice;