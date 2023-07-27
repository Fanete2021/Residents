import { getCities } from "./model/selectors/getCities";
import { citiesActions, citiesReducer } from "./model/slice/citiesSlice";
import { City } from "./model/types/city";

export {
  City,
  citiesActions,
  citiesReducer,
  getCities
}