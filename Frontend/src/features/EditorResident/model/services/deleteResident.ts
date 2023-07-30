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
        const { data } = error.response;
        const message = data[0]?.msg || data?.message;

        return thunkAPI.rejectWithValue(`${message}`);
      }

      return thunkAPI.rejectWithValue(`error`);
    }
  }
);