import { selector } from "recoil";
import { IPost } from "../../interfaces/IPost";

const posts: IPost[] = [
  {
    id: "adsfsdafasdf",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/phlox-blog.appspot.com/o/images%2FCaptura%20de%20tela%202024-08-03%20142311.png?alt=media&token=f6c206b3-766b-4b64-a91c-aade70ddf35c",
    title: "Post Teste",
    content: "adsfasdfsdafasdf",
    postDate: "Tue Aug 20 2024 10:15:30 GMT-0400 (Horário Padrão do Amazonas)",
    badges: {
      defaultBadges: {
        storyPressed: true,
        tecnologyPressed: false,
        newsPressed: true,
        programationPressed: false,
        opportunityPressed: true,
        offerPressed: true,
      },
      personalizedBadges: [
        { 
          id: "string",
          title: "Teste",
          pressed: false
        }
      ]
    }
  }
]

export const postsAsync = selector<IPost[]>({
  key: "postsAsync",
  get: () => {
    return posts
  }
});