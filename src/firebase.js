// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDn_hNC-DpelNv97pd5YPZdxt35fG0rhso",
  authDomain: "ecom-876e6.firebaseapp.com",
  projectId: "ecom-876e6",
  storageBucket: "ecom-876e6.firebasestorage.app",
  messagingSenderId: "913768625321",
  appId: "1:913768625321:web:bfcd849d94465c51caa5b8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
