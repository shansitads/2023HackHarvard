import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {
    getFirestore, setDoc, doc
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

import {data} from "./keys.jsx"

const firebaseConfig = {
  apiKey: data.API_KEY,
  authDomain: data.AUTH_DOMAIN,
  projectId: data.PROJECT_ID,
  storageBucket: data.STORAGE_BUCKET,
  messagingSenderId: data.MESSAGING_SENDER_ID,
  appId: data.APP_ID,
  measurementId: data.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

function createUser(email, password, careTakerName, careTakerEmail) {
  createUserWithEmailAndPassword(auth, email, password).then((cred)=> {
    setDoc(doc(db, 'users', cred.user.uid), {
      careTakerName: careTakerName,
      careTakerEmail: careTakerEmail
    })
  });
}

function login(email, password) {
  signInWithEmailAndPassword(auth, email, password).then((cred)=> {
    //reset the text fields here.
  })
  .catch((err)=> {
    //Need to add frontend information to notify user login fail
    console.log("login failed");
  })
}

function logout() {
  signOut(auth).then(()=> {
    console.log("the user signed out");
  })
  .catch((err)=> {
    console.log(err.message);
  })
}

export default {app, db, createUser, login, logout};