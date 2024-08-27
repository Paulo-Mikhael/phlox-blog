import { useSetRecoilState } from "recoil";
import { postsState } from "../state/atom";
import { getFromDatabase } from "./firebase/functions/getFromDatabase";

export function getPosts() {
  const setPosts = useSetRecoilState(postsState);

  getFromDatabase.Posts()
    .then((posts) => {
      setPosts(posts);
    })
    .catch((err) => {
      throw new Error(err);
    });
}