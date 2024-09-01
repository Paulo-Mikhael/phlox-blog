import { useRecoilValue } from "recoil";
import { getUserPosts } from "../../utils/getUserPost";
import { postsFilteredByBadges } from "../../utils/postsFilteredByBadges";
import { postsFilteredByTitle } from "../../utils/postsFilteredByTitle";
import { postsFilterState } from "../atom";

export function useFilteredUserPosts(userId: string){
  const userPosts = getUserPosts(userId);
  const filters = useRecoilValue(postsFilterState);
  let filteredUserPosts = [
    ...userPosts
  ]
  if (!filters) return;
  
  filteredUserPosts = postsFilteredByTitle(filteredUserPosts, filters.postTitle);
  filteredUserPosts = postsFilteredByBadges(filteredUserPosts);

  return filteredUserPosts;
}