import { useRecoilValue } from "recoil";
import { IUser } from "../../interfaces/IUser";
import { useUsers } from "./useUsers";
import { usersFilterState } from "../atom";

export function useFilteredUsers(): IUser[] {
  const users = useUsers();
  const filter = useRecoilValue(usersFilterState);
  if (!filter) return users;

  let filteredUsers = [
    ...users
  ]

  if (filter.userEmail){
    filteredUsers = users.filter((item) => item.email === filter.userEmail);
  }

  return filteredUsers;
}