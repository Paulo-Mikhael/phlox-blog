import { useSetRecoilState } from "recoil";
import { usersState } from "../state/atom";
import { getFromDatabase } from "./firebase/functions/getFromDatabase";

export function getUsers() {
  const setUsers = useSetRecoilState(usersState);

  getFromDatabase.Users()
    .then((users) => {
      setUsers(users);
    })
    .catch((err) => {
      throw new Error(err);
    });
}