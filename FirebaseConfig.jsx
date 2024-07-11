// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.SECRET_FIREBASE_API_KEY,
  authDomain: import.meta.env.SECRET_AUTH_DOMAIN,
  projectId: import.meta.env.SECRET_PROJECT_ID,
  storageBucket: import.meta.env.SECRET_STORAGE_BUCKETS,
  messagingSenderId: "719795490398",
  appId: import.meta.env.SECRET_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore();
const auth = getAuth(app);

export { fireDB, auth };
