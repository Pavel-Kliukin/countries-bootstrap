// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { getFavourites, isLoading } from "../features/countries/favouritesSlice";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {


  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
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

//Adds Favourite country to Firebase
export const addFavouriteToFirebase = async (uid, name) => {
  try {
    await addDoc(collection(db, `users/${uid}/favourites`), { name });
  } 
  catch (err) {
      console.error("Error adding favourite to Firebase database: ", err);
  }
};

//Removes Favourite country from Firebase
export const removeFavouriteFromFirebase = async (uid, name) => {
  try {
    if (!name) {
      console.error("Error removing favourite from Firebase database: name parameter is undefined");
      return;
    }
    const q = query(collection(db, `users/${uid}/favourites`), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  } 
  catch (err) {
    console.error("Error removing favourite from Firebase database: ", err);
  }
};

//Clears all Favourite countries from Firebase
export const clearFavouritesFromFirebase = async (uid) => {
  try {
    const q = query(collection(db, `users/${uid}/favourites`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
      console.log("Favourites removed from Firebase database");
    });
  } 
  catch (err) {
    console.error("Error removing favourites from Firebase database: ", err);
  }
};

export const getFavouritesFromSource = () =>
  async (dispatch) => {
  const user = auth.currentUser
  if (user) {
    const q = await getDocs(collection(db, `users/${user.uid}/favourites`));
    const favourites = q.docs.map((doc) => doc.data().name);
    dispatch(getFavourites(favourites));
    dispatch(isLoading(false));
  }
};