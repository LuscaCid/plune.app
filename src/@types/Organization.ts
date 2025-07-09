import type { User } from "./user";

export interface Organization {
  id? : string;
  name : string;
  createdBy : string;
  users : User[],
}