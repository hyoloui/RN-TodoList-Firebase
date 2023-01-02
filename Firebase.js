// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBI3wEXv_M-xkVW8cTpfOzxhPmfmga5Svo",
    authDomain: "to-do-list-80bac.firebaseapp.com",
    projectId: "to-do-list-80bac",
    storageBucket: "to-do-list-80bac.appspot.com",
    messagingSenderId: "153562437931",
    appId: "1:153562437931:web:623977977f39b263b14d6e",
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
