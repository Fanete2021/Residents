import { getResidents } from "./model/selectors/getResidents";
import {residentsActions, residentsReducer } from "./model/slice/residentsSlice";
import {Resident } from "./model/types/resident";

export {
  Resident,
  residentsActions,
  residentsReducer,
  getResidents
}