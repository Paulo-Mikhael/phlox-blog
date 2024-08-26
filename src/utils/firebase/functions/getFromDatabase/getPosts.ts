import { ref, get, child } from "firebase/database";
import { IPost } from "../../../../interfaces/IPost";
import { firebaseRealtimeDatabase } from "../../firebase";

export function Posts(): Promise<IPost[]> {
  const dbRef = ref(firebaseRealtimeDatabase);
  const posts: IPost[] = [];

  return new Promise((resolve, reject) => {
    get(child(dbRef, "users"))
      .then((snapshot) => {
        if (!snapshot.exists()) console.log("Sem dados no caminho fornecido");
        const users = snapshot.val();

        for (const userId in users) {
          const currentUserPosts = users[userId].userPosts;
          
          for (const postId in currentUserPosts){
            const currentPost: IPost = currentUserPosts[postId];

            const newPost: IPost = {
              ...currentPost,
              badges: {
                defaultBadges: {
                  ...currentPost.badges.defaultBadges
                },
                personalizedBadges: currentPost.badges.personalizedBadges ? [...currentPost.badges.personalizedBadges] : []
              }
            }

            posts.push(newPost);
          };
        }

        resolve(posts);
      })
      .catch((err) => {
       reject(err);
      });
  });
}