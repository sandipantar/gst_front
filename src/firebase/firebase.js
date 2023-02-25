// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2sgsz_PcIighNdmuwYoejyucv0ePU0OM",
  authDomain: "gst-project-54e61.firebaseapp.com",
  projectId: "gst-project-54e61",
  storageBucket: "gst-project-54e61.appspot.com",
  messagingSenderId: "775068478266",
  appId: "1:775068478266:web:46a628a20af6ad63537e03",
  measurementId: "G-SY67R9Q0TW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);