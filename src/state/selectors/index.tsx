import { selector } from "recoil";
import { IPost } from "../../interfaces/IPost";

export const postsAsync = selector<IPost[]>({
  key: "postsAsync",
  get: async () => {
    // try {
    //   const posts = await getFromDatabase.Posts()
    //   return posts;
    // } catch (err) {
    //   throw new Error(String(err));
    // }
    return []
  }
});