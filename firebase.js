// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd6PsAxn7fMLSD3gCBIGsXjvBhiiq3lls",
  authDomain: "hspantry-app-5ad6f.firebaseapp.com",
  projectId: "hspantry-app-5ad6f",
  storageBucket: "hspantry-app-5ad6f.appspot.com",
  messagingSenderId: "923532869071",
  appId: "1:923532869071:web:70cdc00688e47049c2e6ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)
export{app,firestore}

