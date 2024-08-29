import { SetterOrUpdater } from "recoil";
import { getFromDatabase } from "./firebase/functions/getFromDatabase";
import { IPost } from "../interfaces/IPost";

export function getPosts(setPosts: SetterOrUpdater<IPost[]>) {
  getFromDatabase.Posts()
    .then((posts) => {
      setPosts(posts);
    })
    .catch((err) => {
      throw new Error(err);
    });
}