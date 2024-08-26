import { selector } from "recoil";
import { IPost } from "../../interfaces/IPost";
import { getFromDatabase } from "../../utils/firebase/functions/getFromDatabase";

export const postsAsync = selector<IPost[]>({
  key: "postsAsync",
  get: () => {
    getFromDatabase.Posts()
      .then((posts) => {
        return posts;
      })
      .catch((err) => {
        throw new Error(err);
      });

    return []
  }
});