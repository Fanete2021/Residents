import { Resident } from "entities/Resident";

export interface ResidentFormSchema {
  resident: Resident;
  isLoading: boolean;
  error?: string;
}