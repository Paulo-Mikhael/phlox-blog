import { useSetRecoilState } from "recoil";
import { usersFilterState } from "../atom";

export function useSetFilterUserEmail() {
  const setFilterUserEmail = useSetRecoilState(usersFilterState);

  return (userEmail: string) => {
    setFilterUserEmail(prv => {
      return {
        ...prv,
        userEmail: userEmail
      }
    });
  }
}