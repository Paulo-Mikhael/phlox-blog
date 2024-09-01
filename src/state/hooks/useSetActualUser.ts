import { useSetRecoilState } from "recoil";
import { actualUserState } from "../atom";
import { User } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { firebaseRealtimeDatabase } from "../../utils/firebase/firebase";
import { IUser, IUserFavorite } from "../../interfaces/IUser";
import { getFirebaseArrayLength } from "../../utils/firebase/functions/getFirebaseArrayLength";

export function useSetActualUser() {
  const setActualUser = useSetRecoilState(actualUserState);
  const dbRef = ref(firebaseRealtimeDatabase);

  function getUserData(userEmail: string | null): Promise<IUser> {
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

              for (const userId in currentUserFavorites){
                usersFavorited.push({
                  id: userId,
                  favorited: currentUserFavorites[userId].favorited
                });
              };

              const newUserData: IUser = {
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

  return async (user: User) => {
    getUserData(user.email)
      .then((newUser) => {
        setActualUser({
          auth: user,
          data: newUser
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}