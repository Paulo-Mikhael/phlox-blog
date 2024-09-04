import { User } from "firebase/auth";
import { IUser } from "./IUser";

export interface IActualUser { 
  auth: User | null, 
  data: IUser 
}