import { getUrlFromStorage } from "./getUrlFromStorage";
import { insertToStorage } from "./insertToStorage";

export function submitImageToStorage(file: File): Promise<string> {
  const path = `images/${file.name.trim()}`;

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