// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEZ6LGDCTV21mGgWYpIY3SsIE-QXeTLy8",
  authDomain: "gst-project-a0726.firebaseapp.com",
  projectId: "gst-project-a0726",
  storageBucket: "gst-project-a0726.appspot.com",
  messagingSenderId: "582993523284",
  appId: "1:582993523284:web:01c353b8c3274291f273c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);