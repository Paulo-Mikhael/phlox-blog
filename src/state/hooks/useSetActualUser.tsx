import { useSetRecoilState } from "recoil";
import { actualUser } from "../atom";
import { User } from "firebase/auth";

export function useSetActualUser(){
  const setUser = useSetRecoilState(actualUser);

  return (user: User) => {
    setUser(user);
  }
}