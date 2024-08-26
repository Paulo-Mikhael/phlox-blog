import { useSetRecoilState } from "recoil";
import { actualUser } from "../atom";
import { User } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { firebaseRealtimeDatabase } from "../../utils/firebase/firebase";
import { IUser } from "../../interfaces/IUser";

export function useSetActualUser() {
  const setUser = useSetRecoilState(actualUser);
  const dbRef = ref(firebaseRealtimeDatabase);

  function getUserData(userEmail: string | null): Promise<IUser> {
    return new Promise((resolve, reject) => {
      get(child(dbRef, "users"))
        .then((snapshot) => {
          if (!snapshot.exists()) console.log("Sem dados no caminho fornecido");
          const users = snapshot.val();

          for (const userId in users) {
            const currentUserEmail = users[userId].userEmail;
            const currentUserAvatarUrl = users[userId].userAvatarUrl;
            const currentUserPosts = users[userId].userPosts;

            if (currentUserEmail === userEmail) {
              const newUserData: IUser = {
                userId: userId,
                userEmail: currentUserEmail,
                userAvatarUrl: currentUserAvatarUrl,
                userPosts: currentUserPosts
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
        setUser({
          auth: user,
          data: newUser
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}