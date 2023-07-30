import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URL_API} from "shared/consts/api";
import {Resident, residentsActions} from "entities/Resident";

export const updateResident = createAsyncThunk<void, Resident, { rejectValue: string }>(
  'updateResident',
  async (resident, thunkAPI) => {
    try {
      const response = await axios.patch(`${URL_API}/residents/${resident._id}`, {
        "city_id": resident.city._id,
        "groups": resident.groups,
        "name": resident.name
      });

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(residentsActions.updateResident(resident));

      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(` ${JSON.stringify(error.response.data)}`);
      }

      return thunkAPI.rejectWithValue(`error`);
    }
  }
);