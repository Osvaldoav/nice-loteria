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

// Check if user is authenticated
export const isAuth = (observer) => {
  return firebase.auth().onAuthStateChanged(observer);
}

// Sign in with email and password
export const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

// Get all existing users
export const streamUsers = (observer) => {
  return db.collection('users').onSnapshot(observer);
};

// Get all existing rounds
export const streamRounds = (observer) => {
  return db.collection('rounds').onSnapshot(observer);
};

// Get around with id
export const streamRoundWithID = (id, observer) => {
  return db.collection('rounds').doc(id).onSnapshot(observer);
};

// Get all existing tables with no user id assigned
export const streamTablesWithNoUserID = (observer) => {
  return db.collection('tables').where('user_id', "==", "").onSnapshot(observer);
};

// Get all existing tables with any user id assigned
export const streamTablesWithAnyUserID = (observer) => {
  return db.collection('tables').where('user_id', ">", "").onSnapshot(observer);
};

// Get all existing tables with a specific user id
export const streamTablesWithUserID = (id, observer) => {
  return db.collection('tables').where('user_id', '==', id).onSnapshot(observer);
};

// Get currentInfo document
export const streamCurrentGameDetails = (observer) => {
  return db.collection('details').doc('currentInfo').onSnapshot(observer);
};

// Update user document
export const updateUser = (user, data) => {
  return db.collection('users').doc(user).update(data);
};

// Update round document
export const updateRound = (round, data) => {
  return db.collection('rounds').doc(round).update(data);
};

// Create new user
export const createUser = (user) => {
  return db.collection('users').add(user);
}

// Create new round
export const createRound = (round, data) => {
  return db.collection('rounds').doc(round).set(data);
}

// Delete new user
export const deleteUser = (userID) => {
  return db.collection('users').doc(userID).delete();
}

// Creates a new table document
export const createTable = (data, id) => {
  if(new Set(data.cards).size !== data.cards.length)
    return Promise.reject(new Error('Table cannot have duplicated cards'));
  
  if(!data.cards.every(card => card >= 1 && card <= 54))
    return Promise.reject(new Error('All cards value must be between 1-54'));

  return db.collection('tables').doc(id).set(data, {merge: true});
};