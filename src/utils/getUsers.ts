import { getFromDatabase } from "./firebase/functions/getFromDatabase";
import { IUser } from "../interfaces/IUser";

export function getUsers(setUsers: (users: IUser[]) => void) {
  getFromDatabase.Users()
    .then((users) => {
      setUsers(users);
    })
    .catch((err) => {
      throw new Error(err);
    });
}