// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "exclusive-store-ca0ae.firebaseapp.com",
  projectId: "exclusive-store-ca0ae",
  storageBucket: "exclusive-store-ca0ae.appspot.com",
  messagingSenderId: "930756929290",
  appId: "1:930756929290:web:200c2855b83ac24bf97cf3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);