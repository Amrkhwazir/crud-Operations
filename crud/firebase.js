// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo-x2X5psB5Lo0PRVLmeH2lD5sHF9XhlA",
  authDomain: "fir-auth-75c2b.firebaseapp.com",
  projectId: "fir-auth-75c2b",
  storageBucket: "fir-auth-75c2b.appspot.com",
  messagingSenderId: "536264298898",
  appId: "1:536264298898:web:09860a09338f0c3014b14b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export default app;