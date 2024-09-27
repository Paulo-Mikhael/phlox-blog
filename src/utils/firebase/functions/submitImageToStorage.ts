import { getUrlFromStorage } from "./getUrlFromStorage";
import { insertToStorage } from "./insertToStorage";
import { v4 as uuidV4 } from "uuid";

export function submitImageToStorage(file: File): Promise<string> {
  const imageName = file.name.trim();
  const randomName = uuidV4();
  const path = `images/${imageName === "image.png" ? randomName : imageName}`;

  return new Promise((resolve, reject) => {
    insertToStorage(path, file)
      .then(() => {
        getUrlFromStorage(path)
          .then((url) => {
            resolve(url);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}
