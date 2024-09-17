import { IUser } from "../interfaces/IUser";
import { getUserById } from "./getUserById";

export function getUserFavorites(userId: string, users: IUser[]): IUser[] {
  const user = getUserById(userId)
  
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