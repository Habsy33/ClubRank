
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAl_NrTySPM7BnuPUqBxTX63h-siBPdLUI",
  authDomain: "clubrank-35aa6.firebaseapp.com",
  databaseURL: "https://clubrank-35aa6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "clubrank-35aa6",
  storageBucket: "clubrank-35aa6.firebasestorage.app",
  messagingSenderId: "685730143105",
  appId: "1:685730143105:web:5783c06da8b26490e1e680",
  measurementId: "G-CZM595JLRE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db, ref, set, get };
