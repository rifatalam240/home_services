// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAYgCoC4cdIZa24eViCDbM-b66sMbxaJ4",
  authDomain: "homeservice-38fc3.firebaseapp.com",
  projectId: "homeservice-38fc3",
  storageBucket: "homeservice-38fc3.firebasestorage.app",
  messagingSenderId: "996833898642",
  appId: "1:996833898642:web:ac2f3474ec19b16369b64b",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
