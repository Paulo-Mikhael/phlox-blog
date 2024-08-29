import { SetterOrUpdater } from "recoil";
import { getFromDatabase } from "./firebase/functions/getFromDatabase";
import { IUser } from "../interfaces/IUser";

export function getUsers(setUsers: SetterOrUpdater<IUser[]>) {
  getFromDatabase.Users()
    .then((users) => {
      setUsers(users);
    })
    .catch((err) => {
      throw new Error(err);
    });
}