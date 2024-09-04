import { useRecoilValue } from "recoil"
import { actualUserState } from "../atom";

export function useActualUser(){
  const actualUser = useRecoilValue(actualUserState);
  
  return actualUser;
}