import { StateSchema } from "app/providers/StoreProvider/config/StateSchema";

export const getResidents = (state: StateSchema) => state.residents.data;