import { useSetRecoilState } from "recoil";
import { actualUserState } from "../atom";
import { IActualUser } from "../../interfaces/IActualUser";

export function useSetActualUser() {
  const setActualUser = useSetRecoilState(actualUserState);

  return (user: IActualUser) => {
    setActualUser(user);
  }
}