import firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp({
  apiKey: "AIzaSyD75PhkkkkR0AQ8Dv1hx7rquO-GrfbSYSI",
  authDomain: "final-5e3bc.firebaseapp.com",
  databaseURL: "https://final-5e3bc.firebaseio.com",
  projectId: "final-5e3bc",
  storageBucket: "final-5e3bc.appspot.com",
  messagingSenderId: "753356600362"
});

const auth = firebase.auth();
const firestore = firebase.firestore;
const storage = firebase.storage;

export {firebase, auth, firestore, storage};
export default firebase;
