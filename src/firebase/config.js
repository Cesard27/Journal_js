// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyB3hFroE0tf5OvZx07GBeqbuvioHGsR2R0",
   authDomain: "react-curso-a549b.firebaseapp.com",
   projectId: "react-curso-a549b",
   storageBucket: "react-curso-a549b.appspot.com",
   messagingSenderId: "290995343794",
   appId: "1:290995343794:web:cedb7b67ba48190259d4ab"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);