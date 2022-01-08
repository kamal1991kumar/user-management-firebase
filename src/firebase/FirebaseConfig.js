import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyD_hkW0HV-5zGxx07COjuTDq2Ps6WO4fv0",
  authDomain: "user-management-firebase-3241a.firebaseapp.com",
  projectId: "user-management-firebase",
  storageBucket: "user-management-firebase.appspot.com",
  messagingSenderId: "954602388955",
  appId: "1:954602388955:web:4709da8b9f947998d27bfe"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();