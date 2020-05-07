import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { array } from "prop-types";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Get all existing table documents
export const getTables = () => {
  return db.collection('tables').get();
};

// Get all existing user documents
export const getUsers = () => {
  return db.collection('users').get();
};

// Creates a new table document
export const createTable = (data, id) => {
  if(new Set(data.cards).size !== data.cards.length)
    return Promise.reject(new Error('Table cannot have duplicated cards'));
  
  if(!data.cards.every(card => card >= 1 && card <= 54))
    return Promise.reject(new Error('All cards value must be between 1-54'));

  return db.collection('tables').doc(id).set(data, {merge: true});
};