import { getResidents } from "./model/selectors/getResidents";
import { loadResidents } from "./model/service/loadResidents";
import {residentsActions, residentsReducer } from "./model/slice/residentsSlice";
import {Resident, Group, ResidentSchema } from "./model/types/resident";

export {
  Resident,
  ResidentSchema,
  residentsActions,
  residentsReducer,
  getResidents,
  loadResidents,
  Group
}