// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzx1uBS1NePXlVwnZtg5DqrPwTTVN9zYU",
  authDomain: "twitter-e23a9.firebaseapp.com",
  projectId: "twitter-e23a9",
  storageBucket: "twitter-e23a9.appspot.com",
  messagingSenderId: "693893066177",
  appId: "1:693893066177:web:9a4c24833235fc71d65340",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth referansını alıyoruz
export const auth = getAuth(app);

//provider referansını alıyoruz
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

//storage referansını al
export const storage = getStorage(app);
