// SDK
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


firebase.initializeApp ({
  apiKey: "AIzaSyACdu9cMRFJg0NEi9jtN_HruTBq2sN8tKs",
  authDomain: "genchat-e3156.firebaseapp.com",
  projectId: "genchat-e3156",
  storageBucket: "genchat-e3156.firebasestorage.app",
  messagingSenderId: "973307484751",
  appId: "1:973307484751:web:e46caff6904e6407a8283a"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

export { firebase, auth, firestore };