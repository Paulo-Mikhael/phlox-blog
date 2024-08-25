import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { firebaseAuth } from "../firebase";

export function createUserEmailPassword(email: string, password: string): Promise<UserCredential> {
  const auth = firebaseAuth;

  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        resolve(userCredential);
      })
      .catch((error) => {
        reject(error);
      })
  });
}