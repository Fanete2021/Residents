import { City } from "entities/City";
import {Resident} from "entities/Resident";

export interface StateSchema {
  cities: City[];
  residents: Resident[];
}