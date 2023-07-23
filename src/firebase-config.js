import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJUPI3R9rEMng_g13s5DmMLw0lUdF5MTU",
  authDomain: "profile-app-1bd1f.firebaseapp.com",
  projectId: "profile-app-1bd1f",
  storageBucket: "profile-app-1bd1f.appspot.com",
  messagingSenderId: "475934970613",
  appId: "1:475934970613:web:090b4409181c41be8aebbc",
  measurementId: "G-ZTP00V0ZPZ",
};

firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const auth = firebase.auth();
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { db, auth, googleProvider };
export default firebase;
