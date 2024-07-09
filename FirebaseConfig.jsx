// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn87kgl4LrcgzbhiZtGTszATuS96lWCHw",
  authDomain: "online-store-395c8.firebaseapp.com",
  projectId: "online-store-395c8",
  storageBucket: "online-store-395c8.appspot.com",
  messagingSenderId: "719795490398",
  appId: "1:719795490398:web:83e19db5bb74403676aecf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore();
const auth = getAuth(app);

export { fireDB, auth };
