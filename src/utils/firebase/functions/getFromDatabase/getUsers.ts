import { child, get, ref } from "firebase/database";
import { IUser } from "../../../../interfaces/IUser";
import { firebaseRealtimeDatabase } from "../../firebase";
import { getFirebaseArrayLength } from "../getFirebaseArrayLength";
import { normalizePostArray } from "../../../normalizePostArray";

export function getUsers(): Promise<IUser[]> {
  const dbRef = ref(firebaseRealtimeDatabase);
  const users: IUser[] = [];

  return new Promise((resolve, reject) => {
    get(child(dbRef, "users"))
      .then((snapshot) => {
        if (!snapshot.exists()) {
          return resolve([]);
        };

        const usersSnapshot = snapshot.val();

        for (const userId in usersSnapshot) {
          const currentUser = usersSnapshot[userId];
          const currentUserPosts = currentUser.posts;
          let postsNumber = getFirebaseArrayLength(currentUserPosts);
          const normalizedUserPosts = normalizePostArray(currentUserPosts);

          const newUser: IUser = {
            id: userId,
            email: currentUser.email,
            avatarUrl: currentUser.avatarUrl,
            posts: normalizedUserPosts,
            postsNumber: postsNumber
          }

          users.push(newUser);
        };

        resolve(users);
      })
      .catch((err) => {
        reject(err);
      });
  });
}