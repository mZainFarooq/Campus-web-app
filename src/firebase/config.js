// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCat2MOiyngVjTeYQ20IbpAsTzIR8Z4WdQ",
  authDomain: "campus-app-864aa.firebaseapp.com",
  projectId: "campus-app-864aa",
  storageBucket: "campus-app-864aa.firebasestorage.app",
  messagingSenderId: "134104899426",
  appId: "1:134104899426:web:b2d17af1ed1c239c80563b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
