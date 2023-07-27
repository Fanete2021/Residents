import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import {citiesReducer} from "entities/City";
import { residentsReducer } from 'entities/Resident';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    cities: citiesReducer,
    residents: residentsReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: true,
    preloadedState: initialState
  });
}