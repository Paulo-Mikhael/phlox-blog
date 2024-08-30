import { useRecoilValue } from "recoil";
import { IPost } from "../../interfaces/IPost";
import { usePosts } from "./usePosts";
import { postsFilterState } from "../atom";

export function useFilteredPosts(): IPost[] {
  const filters = useRecoilValue(postsFilterState);
  const posts = usePosts();
  const normalizeText = (text: string): string => {
    const normalizedText = text.toLocaleLowerCase().trim();

    return normalizedText;
  }

  if (!filters) return posts;

  let filteredPosts = [
    ...posts
  ];
  const postTitle = filters.postTitle;

  if (postTitle) {
    const postTitleFilter: IPost[] = filteredPosts.filter((item) => normalizeText(item.title).includes(normalizeText(postTitle)));
    filteredPosts = postTitleFilter;
  }

  return filteredPosts;
}