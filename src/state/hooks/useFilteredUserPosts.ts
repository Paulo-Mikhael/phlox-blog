import { useRecoilValue } from "recoil";
import { getUserPosts } from "../../utils/getUserPost";
import { postsFilteredByBadges } from "../../utils/postsFilteredByBadges";
import { postsFilteredByTitle } from "../../utils/postsFilteredByTitle";
import { postsFilterState } from "../atom";
import { postsFilteredByDate } from "../../utils/postsFilteredByDate";

export function useFilteredUserPosts(userId: string){
  const userPosts = getUserPosts(userId);
  const filters = useRecoilValue(postsFilterState);
  let filteredUserPosts = [
    ...userPosts
  ]
  if (!filters) return;
  
  const filterTitle = filters.postTitle;
  const filterDate = filters.postDate;
  
  if (filterTitle){
    filteredUserPosts = postsFilteredByTitle(filteredUserPosts, filterTitle);
  };
  
  if (filterDate){
    filteredUserPosts = postsFilteredByDate(filteredUserPosts, filterDate);
  };

  filteredUserPosts = postsFilteredByBadges(filteredUserPosts);

  return filteredUserPosts;
}