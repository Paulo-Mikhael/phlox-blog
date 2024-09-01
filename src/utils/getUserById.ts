import { IUser } from "../interfaces/IUser";
import { useUsers } from "../state/hooks/useUsers";

export function getUserById(userId: string): IUser {
  const invalidUser: IUser = {
    email: "invalid data"
  }

  const usersCopy = useUsers();
  const users = [
    ...usersCopy
  ];

  const requiredUser = users.find((item) => item.id === userId);

  if (!requiredUser) return invalidUser;

  return requiredUser;
}