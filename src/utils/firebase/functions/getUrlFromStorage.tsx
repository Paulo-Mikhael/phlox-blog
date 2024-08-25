import { getDownloadURL, ref as refStorage } from "firebase/storage";
import { firebaseStorage } from "../firebase";

export function getUrlFromStorage(path: string): Promise<string> {
  const storageRef = refStorage(firebaseStorage, path);

  return new Promise((resolve, reject) => {
    getDownloadURL(storageRef)
      .then((url) => {
        resolve(url);
      })
      .catch((err) => {
        reject(err);
      });
  });
}