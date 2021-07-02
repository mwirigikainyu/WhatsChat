import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAJ5Lpmkwq_2xjiupL6fG6Fw7gHeJ-tU3k",
  authDomain: "whatsapp-2-610f1.firebaseapp.com",
  projectId: "whatsapp-2-610f1",
  storageBucket: "whatsapp-2-610f1.appspot.com",
  messagingSenderId: "473648020475",
  appId: "1:473648020475:web:d7fd805538f9df2743695e",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
