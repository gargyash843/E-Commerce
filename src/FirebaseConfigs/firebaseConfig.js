// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDDbSYTZD3Xncav8fmrXJW44H1B7UJ3Uno",
    authDomain: "project-exhibition-18812.firebaseapp.com",
    projectId: "project-exhibition-18812",
    storageBucket: "project-exhibition-18812.appspot.com",
    messagingSenderId: "107007576948",
    appId: "1:107007576948:web:00211bb29366b12dcf3a21"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)