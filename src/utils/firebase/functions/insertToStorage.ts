import { uploadBytes, ref as refStorage, UploadResult } from "firebase/storage";
import { firebaseStorage } from "../firebase";

export function insertToStorage(path: string, file: File): Promise<UploadResult> {
  const storageRef = refStorage(firebaseStorage, path);

  return new Promise((resolve, reject) => {
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((error) => {
        reject(error);
      });
  })
}