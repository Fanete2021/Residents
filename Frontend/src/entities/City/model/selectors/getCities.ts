import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getCities = (state: StateSchema) => state.cities.data;