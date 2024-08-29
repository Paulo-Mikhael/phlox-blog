import { IUser } from "../interfaces/IUser";
import { useUsers } from "../state/hooks/useUsers";

export function getUserById(userId: string): IUser | undefined{
  const usersCopy = useUsers();
  const users = [
    ...usersCopy
  ];

  const requiredUser = users.find((item) => item.id === userId);

  return requiredUser;
}