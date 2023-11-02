// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBQhn-WgLvFOiCVL5eNYhOjHxAmJI4vhCs",
  authDomain: "work-magement-app.firebaseapp.com",
  projectId: "work-magement-app",
  storageBucket: "work-magement-app.appspot.com",
  messagingSenderId: "825184343644",
  appId: "1:825184343644:web:7533267a62f5ad752af899",
  measurementId: "G-YTCE4E641Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);