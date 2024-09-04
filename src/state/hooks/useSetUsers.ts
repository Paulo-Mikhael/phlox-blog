import { useSetRecoilState } from "recoil";
import { usersState } from "../atom";
import { IUser } from "../../interfaces/IUser";

export function useSetUsers(){
  const setUsers = useSetRecoilState(usersState);

  return (users: IUser[]) => {
    setUsers(users);
  };
}