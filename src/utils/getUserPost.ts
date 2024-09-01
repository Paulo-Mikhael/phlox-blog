import { IPost } from "../interfaces/IPost";
import { useUsers } from "../state/hooks/useUsers";

export function getUserPosts(userId: string): IPost[]{
  const users = useUsers();

  const userRequired = users.find((item) => item.id === userId);
  if (!userRequired) return [];
  if (!userRequired.posts) return [];

  return userRequired.posts;
}