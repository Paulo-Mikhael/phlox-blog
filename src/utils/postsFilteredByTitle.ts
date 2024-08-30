import { IPost } from "../interfaces/IPost";
import { normalizeText } from "./normalizeText";

export function postsFilteredByTitle(postsArray: IPost[], postTitle: string): IPost[] {
  let filteredPosts = [
    ...postsArray
  ]

  filteredPosts = filteredPosts.filter((item) => normalizeText(item.title).includes(normalizeText(postTitle)));

  return filteredPosts;
}