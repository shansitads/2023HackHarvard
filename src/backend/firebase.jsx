import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, query, setDoc, getDoc, getDocs, doc, deleteDoc, loadBundle, where
} from 'firebase/firestore';

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

export default {app, db};