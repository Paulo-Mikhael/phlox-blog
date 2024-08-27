import { useSetRecoilState, useRecoilValue } from "recoil";
import { getFromDatabase } from "../../utils/firebase/functions/getFromDatabase";
import { usersState } from "../atom";
import { IUser } from "../../interfaces/IUser";

export function useGetUsers(): () => IUser[] {
  const setUsers = useSetRecoilState(usersState);
  const users = useRecoilValue(usersState);

  getFromDatabase.Users()
    .then((users) => {
      setUsers(users);
    })
    .catch((err) => {
      throw new Error(err);
    });

  return () => {
    return users;
  }
}