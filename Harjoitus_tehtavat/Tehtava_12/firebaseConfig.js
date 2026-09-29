// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKfo9jiUrd2u3WpC2bX9V7oIxa29Ab_AY",
  authDomain: "shoppinglist-mobile.firebaseapp.com",
  databaseURL: "https://shoppinglist-mobile-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shoppinglist-mobile",
  storageBucket: "shoppinglist-mobile.firebasestorage.app",
  messagingSenderId: "169875923441",
  appId: "1:169875923441:web:5170a4e2a2747f54476450"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);