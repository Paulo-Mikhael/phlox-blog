import { useSetRecoilState } from "recoil";
import { usersState } from "../atom";

export function useSetUsers(){
  const setUsers = useSetRecoilState(usersState);

  return setUsers;
}