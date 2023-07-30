import {City} from "entities/City";

export interface CityFormSchema {
  city: City;
  isLoading: boolean;
  error?: string;
}