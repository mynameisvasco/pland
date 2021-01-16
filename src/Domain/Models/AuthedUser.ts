import { AccountStatus } from "../Enums/AccountStatus";
import { AccountTypes } from "../Enums/AccountTypes";

export interface AuthedUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  rating: number;
  status: AccountStatus;
  type: AccountTypes;
}
