// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider , signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlAAwK8vBcBohx8lrq9owcttA5kpCNqsw",
  authDomain: "playzo-933ae.firebaseapp.com",
  projectId: "playzo-933ae",
  storageBucket: "playzo-933ae.appspot.com",
  messagingSenderId: "703110965303",
  appId: "1:703110965303:web:fcab2ff90eb2bca8bab7b2",
  measurementId: "G-8NZJRP38RX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth , provider , signInWithPopup }