import { ref, get, child } from "firebase/database";
import { IPost } from "../../../../interfaces/IPost";
import { firebaseRealtimeDatabase } from "../../firebase";
import { normalizePostArray } from "../../../normalizePostArray";

export function getPosts(): Promise<IPost[]> {
  const dbRef = ref(firebaseRealtimeDatabase);
  const posts: IPost[] = [];

  return new Promise((resolve, reject) => {
    get(child(dbRef, "users"))
      .then((snapshot) => {
        if (!snapshot.exists()) {
          return resolve([]);
        };
        
        const users = snapshot.val();

        for (const userId in users) {
          const currentUserPosts = users[userId].posts;
          
          if (currentUserPosts) {
            const normalizedUserPosts = normalizePostArray(currentUserPosts);

            for (const postId in normalizedUserPosts) {
              const currentPost: IPost = normalizedUserPosts[postId];

              posts.push(currentPost);
            };
          }
        }

        resolve(posts);
      })
      .catch((err) => {
        reject(err);
      });
  });
}