import { useSetRecoilState } from "recoil";
import { postsState } from "../atom";

export function useSetPosts(){
  const setPosts = useSetRecoilState(postsState);

  return setPosts;
}