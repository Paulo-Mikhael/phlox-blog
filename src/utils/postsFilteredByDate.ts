import { IPost } from "../interfaces/IPost";

export function postsFilteredByDate(posts: IPost[], date: string): IPost[]{
  const dayObj = new Date(date);

  const filteredPosts = posts.filter((item) => {
    const postDateObj = new Date(item.postDate);

    return postDateObj >= dayObj;
  });

  return filteredPosts;
}