import { useRecoilValue } from "recoil";
import { IPost } from "../../interfaces/IPost";
import { postsState } from "../atom";
import { getPosts } from "../../utils/getPosts";

export function usePosts(): IPost[] {
  const posts = useRecoilValue(postsState);

  getPosts();

  return posts;
}