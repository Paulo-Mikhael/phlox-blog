import { IPost } from "../interfaces/IPost";

export const sortPostsByDate = (posts: IPost[]): IPost[] => {
  return posts.sort((a, b) => {
    const dateA = new Date(a.postDate).getTime();
    const dateB = new Date(b.postDate).getTime();
    return dateB - dateA; // Organiza do mais atual ao mais antigo
  });
};
