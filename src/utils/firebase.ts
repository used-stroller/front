// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDF8M2GWOmJPfAPtE-VM5re9eN8TCGU8UI",
  authDomain: "jungmocha-c2bc2.firebaseapp.com",
  projectId: "jungmocha-c2bc2",
  storageBucket: "jungmocha-c2bc2.firebasestorage.app",
  messagingSenderId: "29461634198",
  appId: "1:29461634198:web:aff45589fa1a9e09cc76b7",
  measurementId: "G-JDQCVWGJJK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
