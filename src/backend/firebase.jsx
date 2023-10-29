import { initializeApp } from "firebase/app";
import {
    getFirestore, setDoc, doc
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import data from "./data.json"

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

function getTimestamp() {
  var currentDate = new Date();

  var year = currentDate.getFullYear();
  var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to the month since it's zero-based, and padStart ensures a 2-digit month
  var day = currentDate.getDate().toString().padStart(2, '0');
  var hours = currentDate.getHours().toString().padStart(2, '0');
  var minutes = currentDate.getMinutes().toString().padStart(2, '0');
  var seconds = currentDate.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function createUser(email, password, name, careTakerName, careTakerEmail) {
  return createUserWithEmailAndPassword(auth, email, password).then((cred)=> {
    setDoc(doc(db, 'users', cred.user.uid), {
      name: name,
      careTakerName: careTakerName,
      careTakerEmail: careTakerEmail,
    });

    console.log('successfully created user: ' + email)
  });
}


function logout() {
  signOut(auth).then(()=> {
    console.log("the user signed out");
  })
  .catch((err)=> {
    console.log(err.message);
  })
}

export default {auth, app, db, createUser, logout, getTimestamp };