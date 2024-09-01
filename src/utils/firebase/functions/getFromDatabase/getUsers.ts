import { child, get, ref } from "firebase/database";
import { IUser, IUserFavorite } from "../../../../interfaces/IUser";
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
          const currentUserFavorites = currentUser.usersFavorited;
          const normalizedUserPosts = normalizePostArray(currentUserPosts);
          let postsNumber = getFirebaseArrayLength(currentUserPosts);
          const usersFavorited: IUserFavorite[] = [];

          for (const userId in currentUserFavorites){
            usersFavorited.push({
              id: userId,
              favorited: currentUserFavorites[userId].favorited
            });
          };

          const newUser: IUser = {
            id: userId,
            email: currentUser.email,
            avatarUrl: currentUser.avatarUrl,
            posts: normalizedUserPosts,
            postsNumber: postsNumber,
            usersFavorited: usersFavorited
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