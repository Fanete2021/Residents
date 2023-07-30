import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URL_API} from "shared/consts/api";
import {Resident, residentsActions} from "entities/Resident";

export const createResident = createAsyncThunk<Resident, Resident, { rejectValue: string }>(
  'createResident',
  async (resident, thunkAPI) => {
    try {
      const response = await axios.post<Resident>(`${URL_API}/residents`, {
        "city_id": resident.city._id,
        "groups": resident.groups,
        "name": resident.name
      });

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(residentsActions.addResident(response.data));

      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(` ${JSON.stringify(error.response.data)}`);
      }

      return thunkAPI.rejectWithValue(`error`);
    }
  }
);