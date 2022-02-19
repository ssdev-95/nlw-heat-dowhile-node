import { initializeApp } from "firebase/app";
import {
	collection, addDoc, doc, getFirestore, getDoc, where
} from "firebase/firestore"

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

const app = initializeApp(config);
const db = getFirestore()

export { app, db, collection, addDoc, doc, getDoc, where }
