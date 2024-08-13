
// import { initializeApp } from "firebase/app";
// import {getStorage} from 'firebase/storage'
// import {getFirestore } from "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyCFb02Zsz_-sC9ZSSf00LkC8eMh6tOK5I4",
//   authDomain: "reatjs-to-firebase-toturaiul.firebaseapp.com",
//   databaseURL: "https://reatjs-to-firebase-toturaiul-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "reatjs-to-firebase-toturaiul",
//   storageBucket: "reatjs-to-firebase-toturaiul.appspot.com",
//   messagingSenderId: "962565941824",
//   appId: "1:962565941824:web:00f7810f15de96ae870da5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const imgDB = getStorage(app);

// export default {db,imgDB};




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCcu2qGXOCLBYb_uZiK5qsoLnlzaNZyuv4",
//   authDomain: "fir-2-e11f0.firebaseapp.com",
//   projectId: "fir-2-e11f0",
//   storageBucket: "fir-2-e11f0.appspot.com",
//   messagingSenderId: "508029305779",
//   appId: "1:508029305779:web:5e8257194b31f7eb5981c6",
//   measurementId: "G-DJB6WY82Q7"
// };


import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {getAuth} from 'firebase/auth';
import firebase from 'firebase/compat/app';



const firebaseConfig = {
  apiKey: "AIzaSyCFb02Zsz_-sC9ZSSf00LkC8eMh6tOK5I4",
  authDomain: "reatjs-to-firebase-toturaiul.firebaseapp.com",
  databaseURL: "https://reatjs-to-firebase-toturaiul-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reatjs-to-firebase-toturaiul",
  storageBucket: "reatjs-to-firebase-toturaiul.appspot.com",
  messagingSenderId: "962565941824",
  appId: "1:962565941824:web:00f7810f15de96ae870da5"
};


const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);


export { auth, db, storage };
export default db;

