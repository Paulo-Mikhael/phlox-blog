import { SetterOrUpdater } from "recoil";
import { getFromDatabase } from "./firebase/functions/getFromDatabase";
import { IPost } from "../interfaces/IPost";

export function getPosts(setPosts: SetterOrUpdater<IPost[]>): Promise<void> {
  return new Promise((resolve, reject) => {
    getFromDatabase.Posts()
    .then((posts) => {
      setPosts(posts);
      resolve();
    })
    .catch((err) => {
      reject(err);
    });
  })
}