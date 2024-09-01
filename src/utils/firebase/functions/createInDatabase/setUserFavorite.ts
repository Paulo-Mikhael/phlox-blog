import { ref, set } from "firebase/database";
import { firebaseRealtimeDatabase } from "../../firebase";

export function setUserFavorite(userId: string, userFavoritedId: string, favorited?: boolean): Promise<void> {
  const db = firebaseRealtimeDatabase;

  return new Promise((resolve, reject) => {
    set(ref(db, `users/${userId}/usersFavorited/${userFavoritedId}`), { favorited: favorited === true })
      .then(() => {
        console.log("requisição feita " + `${favorited === true}`);
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}