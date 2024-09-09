import { useSetRecoilState } from "recoil";
import { actualUserState } from "../atom";

export function useSetActualUserFavoriteValue(){
  const setActualUser = useSetRecoilState(actualUserState);

  return (favorited: boolean, userFavorited: string) => {
    setActualUser((prv) => {
      if (!prv?.data.id) return prv;

      let updatedActualUser = {
        ...prv,
        data: {
          ...prv?.data,
          usersFavorited: prv?.data.usersFavorited?.map((item) => ({
            id: item.id,
            favorited: item.id === userFavorited ? favorited : item.favorited
          }))
        },
      }

      return updatedActualUser;
    });
  };
}