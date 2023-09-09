// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAMClIedp7o6x6U0dNAYIMNwbvgXr2CNc",
    authDomain: "react-type-ecommerce.firebaseapp.com",
    projectId: "react-type-ecommerce",
    storageBucket: "react-type-ecommerce.appspot.com",
    messagingSenderId: "7712454824",
    appId: "1:7712454824:web:008f3bfc117a635dd26a9d"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);