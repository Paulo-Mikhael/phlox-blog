import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { firebaseAuth } from "../firebase";

export function signInUserEmailPassword(email: string, password: string): Promise<UserCredential> {
  const auth = firebaseAuth;

  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        resolve(userCredential);
      })
      .catch((error) => {
        reject(error);
      })
  })
}