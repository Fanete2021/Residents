import {City} from "entities/City";

export interface Group {
  _id?: string,
  type: string,
  name: string
}

export interface Resident {
  _id: string,
  name: string,
  city: City,
  groups: Group[]
}

export interface ResidentSchema {
  data: Resident[],
  isLoading: boolean,
  error: string
}