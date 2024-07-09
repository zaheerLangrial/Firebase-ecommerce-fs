// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzzKVh-maeg5_wdyLVtoXrM5Igm1XsCY4",
  authDomain: "epakonlinestore.firebaseapp.com",
  databaseURL: "https://epakonlinestore-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "epakonlinestore",
  storageBucket: "epakonlinestore.appspot.com",
  messagingSenderId: "268192116539",
  appId: "1:268192116539:web:9038821a6b2e20d24a111e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }