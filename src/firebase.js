// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth
} from "firebase/auth";

/**
 * Se encarga de hacer la conexión inicial a firebase y a todas las dependencias
 * implementadas en este proyecto.
 * 
 * @member
 */

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRsMR7cHzG2sG193q-bxVFtMmIZwpwPgc",
  authDomain: "sisu-prueba-correccion.firebaseapp.com",
  projectId: "sisu-prueba-correccion",
  storageBucket: "sisu-prueba-correccion.appspot.com",
  messagingSenderId: "229784994124",
  appId: "1:229784994124:web:98a3dc6d36380753e04fe9",
  measurementId: "G-8MJ08K63T6"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);