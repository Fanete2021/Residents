export interface City {
  _id: string,
  name: string,
  data: string
}

export interface CitySchema {
  data: City[],
  isLoading: boolean,
  error: string
}