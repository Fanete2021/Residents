import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Resident } from "entities/Resident";
import {URL_API} from "shared/consts/api";

export const loadResidents = createAsyncThunk<Resident[], void, { rejectValue: string }>(
  'loadResidents',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Resident[]>(`${URL_API}/residents`);

      if (!response.data) {
        throw new Error();
      }

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить жителей');
    }
  }
);