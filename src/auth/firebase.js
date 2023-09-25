// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUSXmuk6niGtzamWlqiBa-rRaMRn1gF6g",
  authDomain: "countries-13119.firebaseapp.com",
  projectId: "countries-13119",
  storageBucket: "countries-13119.appspot.com",
  messagingSenderId: "570629609890",
  appId: "1:570629609890:web:a97a6cf9151725818efafb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

const loginWithEmailAndPassword = async (email, password) => {

  try {
    await signInWithEmailAndPassword(auth, email, password)
  }
  catch (error) {
    console.log(error)
    alert(error.message)
  }
}

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email: email,
    })
  }
  catch (error) {
    console.log(error)
    alert(error.message)
  }
}

const logout = () => {
  signOut(auth)
}

export { auth, db, loginWithEmailAndPassword, registerWithEmailAndPassword, logout }