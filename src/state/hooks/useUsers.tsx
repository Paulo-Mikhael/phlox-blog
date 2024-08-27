import { useRecoilValue } from "recoil";
import { usersState } from "../atom";
import { getUsers } from "../../utils/getUsers";
import { IUser } from "../../interfaces/IUser";

export function useUsers(): IUser[] {
  const users = useRecoilValue(usersState);

  getUsers();

  return users;
}