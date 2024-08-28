import { useRecoilValue } from "recoil";
import { usersState } from "../atom";
import { IUser } from "../../interfaces/IUser";

export function useUsers(): IUser[] {
  const users = useRecoilValue(usersState);

  return users;
}