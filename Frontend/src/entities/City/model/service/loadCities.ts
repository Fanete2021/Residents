import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { City } from "entities/City";
import {URL_API} from "shared/consts/api";

export const loadCities = createAsyncThunk<City[], void, { rejectValue: string }>(
  'loadCities',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<City[]>(`${URL_API}/cities`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить города');
    }
  }
);