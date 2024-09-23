// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPKAOkNhIj5Re-iRjghWsPm6sgLstZnrk",
  authDomain: "mern-doctor.firebaseapp.com",
  projectId: "mern-doctor",
  storageBucket: "mern-doctor.appspot.com",
  messagingSenderId: "791728636287",
  appId: "1:791728636287:web:dee006ec1a3ec4e0841a4a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);