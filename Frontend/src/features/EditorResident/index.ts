import { getResidentFormState } from "./model/selectors/getResidentFormState";
import { createResident } from "./model/services/createResident";
import { deleteResident } from "./model/services/deleteResident";
import { updateResident } from "./model/services/updateResident";
import { residentFormReducer } from "./model/slice/residentFormSlice";
import { residentFormActions } from "./model/slice/residentFormSlice";
import { ResidentFormSchema } from "./model/types/residentFormSchema";
import { ResidentForm } from "./ui/ResidentForm/ResidentForm";

export {
  ResidentForm,
  ResidentFormSchema,
  createResident,
  residentFormActions,
  residentFormReducer,
  getResidentFormState,
  updateResident,
  deleteResident
}