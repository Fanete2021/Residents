import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import {citiesReducer} from "entities/City";
import { residentsReducer } from 'entities/Resident';
import {residentFormReducer} from "features/EditorResident";
import {cityFormReducer} from "features/EditorCity";

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    cities: citiesReducer,
    residents: residentsReducer,
    residentForm: residentFormReducer,
    cityForm: cityFormReducer
  };

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: true,
    preloadedState: initialState
  });
}