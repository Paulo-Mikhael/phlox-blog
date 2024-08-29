import { IPost } from "../interfaces/IPost";
import { usePosts } from "../state/hooks/usePosts";

export function getPostById(id: string): IPost | undefined{
  const posts = usePosts();
  
  const requestedPost = posts.find((item) => item.id === id);

  return requestedPost;
};