import { useRecoilValue, useSetRecoilState } from "recoil";
import { IPost } from "../../interfaces/IPost";
import { getFromDatabase } from "../../utils/firebase/functions/getFromDatabase";
import { postsState } from "../atom";

export function useGetPosts(): () => IPost[] {
  const setPosts = useSetRecoilState(postsState);
  const posts = useRecoilValue(postsState);

  getFromDatabase.Posts()
    .then((posts) => {
      setPosts(posts);
    })
    .catch((err) => {
      throw new Error(err);
    });

  return () => {
    return posts;
  }
}