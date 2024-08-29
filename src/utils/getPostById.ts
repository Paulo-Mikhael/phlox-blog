import { IPost } from "../interfaces/IPost";
import { usePosts } from "../state/hooks/usePosts";

export function getPostById(postId: string): IPost{
  const invalidPost: IPost = {
    id: "invalid data",
    imageUrl: "invalid data",
    imageAlt: "invalid data",
    title: "invalid data",
    content: "invalid data",
    postDate: "invalid data",
    userAuthorId: "invalid data",
    badges: {
      defaultBadges: {
        storyPressed: false,
        tecnologyPressed: false,
        newsPressed: false,
        programationPressed: false,
        opportunityPressed: false,
        offerPressed: false,
      },
      personalizedBadges: [
        {
          id: "invalid data",
          title: "invalid data",
          pressed: false,
        },
      ],
    },
  };
  const postsCopy = usePosts();
  const posts = [
    ...postsCopy
  ];
  
  const requestedPost = posts.find((item) => item.id === postId);

  if (!requestedPost){
    return invalidPost;
  };

  return requestedPost;
};