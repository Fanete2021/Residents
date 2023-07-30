import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URL_API} from "shared/consts/api";
import {citiesActions, City} from "entities/City";

export const updateCity = createAsyncThunk<void, City, { rejectValue: string }>(
  'updateCity',
  async (city, thunkAPI) => {
    try {
      const response = await axios.patch(`${URL_API}/cities/${city._id}`, city);

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(citiesActions.updateCity(city));

      return response.data;
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        const message = data[0]?.msg || data?.message;

        return thunkAPI.rejectWithValue(`${message}`);
      }

      return thunkAPI.rejectWithValue(`error`);
    }
  }
);