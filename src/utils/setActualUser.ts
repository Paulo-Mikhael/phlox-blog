import { User } from "firebase/auth";
import { IActualUser } from "../interfaces/IActualUser";
import { getFromDatabase } from "./firebase/functions/getFromDatabase";

export function setActualUser(setActualUserState: (user: IActualUser) => void, user: User): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!user.email) return;

    getFromDatabase.ActualUser(user.email)
      .then((response) => {
        let newUser = {
          auth: user,
          data: response
        };
        setActualUserState(newUser);

        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}