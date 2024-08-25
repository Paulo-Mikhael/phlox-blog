import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);
export const firebaseRealtimeDatabase = getDatabase(app);
export const firebaseAuth = getAuth(app);
export const firebaseStorage = getStorage(app);