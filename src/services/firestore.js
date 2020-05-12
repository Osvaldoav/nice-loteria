import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

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

// Get all existing users
export const getUsers = () => {
  return db.collection('users').get();
};

export const updateUser = (user, data) => {
  return db.collection('users').doc(user).update(data);
};

// Get all existing tables with no user id assigned
export const streamTablesWithNoUserID = (observer) => {
  return db.collection('tables').where('user_id', "==", "").onSnapshot(observer);
};

// Get all existing tables with a specific user id
export const streamTablesWithUserID = (id, observer) => {
  return db.collection('tables').where('user_id', '==', id).onSnapshot(observer);
}

// Creates a new table document
export const createTable = (data, id) => {
  if(new Set(data.cards).size !== data.cards.length)
    return Promise.reject(new Error('Table cannot have duplicated cards'));
  
  if(!data.cards.every(card => card >= 1 && card <= 54))
    return Promise.reject(new Error('All cards value must be between 1-54'));

  return db.collection('tables').doc(id).set(data, {merge: true});
};