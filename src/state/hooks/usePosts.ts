import { useRecoilValue } from "recoil";
import { IPost } from "../../interfaces/IPost";
import { postsState } from "../atom";

export function usePosts(): IPost[] {
  const posts = useRecoilValue(postsState);

  return posts;
}