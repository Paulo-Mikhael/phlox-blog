import { useRecoilValue } from "recoil";
import { IPost } from "../../interfaces/IPost";
import { usePosts } from "./usePosts";
import { postsFilterState } from "../atom";
import { postsFilteredByBadges } from "../../utils/postsFilteredByBadges";
import { postsFilteredByTitle } from "../../utils/postsFilteredByTitle";

export function useFilteredPosts(): IPost[] {
  const posts = usePosts();
  const filters = useRecoilValue(postsFilterState);
  if (!filters) return posts;
  const postTitle = filters.postTitle;

  let filteredPosts = [
    ...posts
  ];

  if (postTitle) {
    filteredPosts = postsFilteredByTitle(filteredPosts, postTitle);
  }

  filteredPosts = postsFilteredByBadges(filteredPosts);

  return filteredPosts;
}