import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URL_API} from "shared/consts/api";
import {citiesActions, City} from "entities/City";

export const createCity = createAsyncThunk<City, City, { rejectValue: string }>(
  'createCity',
  async (city, thunkAPI) => {
    try {
      const response = await axios.post<City>(`${URL_API}/cities`, {
        "name": city.name,
        "data": city.data
      });

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(citiesActions.addCity(response.data));

      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(` ${JSON.stringify(error.response.data)}`);
      }

      return thunkAPI.rejectWithValue(`error`);
    }
  }
);