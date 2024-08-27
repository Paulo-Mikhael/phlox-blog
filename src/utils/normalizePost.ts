import { IPost } from "../interfaces/IPost";

export function normalizePost(post: IPost): IPost {
  const normalizedPost: IPost = {
    ...post,
    badges: {
      defaultBadges: {
        ...post.badges.defaultBadges
      },
      personalizedBadges: post.badges.personalizedBadges ? [...post.badges.personalizedBadges] : []
    }
  }

  return normalizedPost;
}