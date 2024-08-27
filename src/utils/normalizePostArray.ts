import { IPost } from "../interfaces/IPost";
import { normalizePost } from "./normalizePost";

export function normalizePostArray(postsAny: IPost[]): IPost[] {
  const normalizedPosts: IPost[] = [];

  if (postsAny) {
    for (const postId in postsAny) {
      const currentPost: IPost = postsAny[postId];

      const normalizedPost: IPost = normalizePost(currentPost);

      normalizedPosts.push(normalizedPost);
    };
  }

  return normalizedPosts;
}