import { getPosts } from "./getPosts";
import { getUsers } from "./getUsers";

export const getFromDatabase = {
  Posts: getPosts,
  Users: getUsers
}