import { ref, get, child } from "firebase/database";
import { IUser, IUserFavorite } from "../../../../interfaces/IUser";
import { firebaseRealtimeDatabase } from "../../firebase";
import { getFirebaseArrayLength } from "../getFirebaseArrayLength";

export function getActualUser(userEmail: string): Promise<IUser> {
  const dbRef = ref(firebaseRealtimeDatabase);

  return new Promise((resolve, reject) => {
    get(child(dbRef, "users"))
      .then((snapshot) => {
        if (!snapshot.exists()) console.log("Sem dados no caminho fornecido");
        const users = snapshot.val();

        for (const userId in users) {
          const currentUserEmail = users[userId].email;
          const currentUserAvatarUrl = users[userId].avatarUrl;
          const currentUserPosts = users[userId].posts;
          const currentUserFavorites = users[userId].usersFavorited;

          if (currentUserEmail === userEmail) {
            const usersFavorited: IUserFavorite[] = [];
            let postsNumber = getFirebaseArrayLength(currentUserPosts);

            for (const userId in currentUserFavorites) {
              usersFavorited.push({
                id: userId,
                favorited: currentUserFavorites[userId].favorited
              });
            };

            let newUserData: IUser = {
              id: userId,
              email: currentUserEmail,
              avatarUrl: currentUserAvatarUrl,
              posts: currentUserPosts,
              postsNumber: postsNumber,
              usersFavorited: usersFavorited
            }

            resolve(newUserData);
          }
        }
      })
      .catch((err) => {
        reject(err);
      });
  })
}