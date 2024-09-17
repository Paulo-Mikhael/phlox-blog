import { IUser } from "../../interfaces/IUser";
import { getUserById } from "../../utils/getUserById";
import { useActualUser } from "./useActualUser";
import { useUsers } from "./useUsers";

export function useUserFavorites(userId: string): () => IUser[] {
  let user = getUserById(userId);
  const users = useUsers();
  const actualUser = useActualUser();

  if (userId === actualUser?.data.id){
    user = actualUser.data;
  }
  
  return () => {
    if (!user) return [];
    if (!user.usersFavorited) return [];
  
    const userFavorites = user.usersFavorited.filter((item) => item.favorited === true);
    const usersFavorited: IUser[] = [];
  
    if (userFavorites){
      userFavorites.forEach((user) => {
        const requiredUser = users.find((item) => user.id === item.id);
  
        if (requiredUser) usersFavorited.push(requiredUser);
      });
    }
  
    return usersFavorited;
  }
}