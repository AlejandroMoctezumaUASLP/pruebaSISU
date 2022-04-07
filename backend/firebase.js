/*******************
 * Documento de conexión del backend a Firebase. Especificamente, se hace la conexión
 * con Firestore (Para el almacenamiento de las colecciones).
 * 
 * @author Alejandro Moctezuma Luna
 */

// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

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
const app = initializeApp(firebaseConfig);
module.exports.db = getFirestore(app);