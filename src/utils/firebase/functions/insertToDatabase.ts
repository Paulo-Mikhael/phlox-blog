import { ref, set } from "firebase/database";
import { firebaseRealtimeDatabase } from "../firebase";

export function insertToDatabase(path: string, data: unknown): Promise<string> {
  const db = firebaseRealtimeDatabase;

  return new Promise((resolve, reject) => {
    set(ref(db, path), data)
      .then(() => {
        resolve("Successfully data transfer");
      })
      .catch((err) => {
        reject(err);
      });
  });
}