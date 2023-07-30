import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {URL_API} from "shared/consts/api";
import {Resident, residentsActions} from "entities/Resident";

export const deleteResident = createAsyncThunk<void, string, { rejectValue: string }>(
  'deleteResident',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${URL_API}/residents/${id}`, );

      if (!response.data) {
        throw new Error();
      }

      thunkAPI.dispatch(residentsActions.deleteResident(id));

      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(` ${JSON.stringify(error.response.data)}`);
      }

      return thunkAPI.rejectWithValue(`error`);
    }
  }
);