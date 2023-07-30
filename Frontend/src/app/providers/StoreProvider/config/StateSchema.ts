import { CitySchema } from "entities/City";
import { ResidentSchema } from "entities/Resident";
import {ResidentFormSchema} from "features/EditorResident";
import {CityFormSchema} from "features/EditorCity";


export interface StateSchema {
  cities: CitySchema;
  residents: ResidentSchema;
  residentForm: ResidentFormSchema;
  cityForm: CityFormSchema
}