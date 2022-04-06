/*******************
 * Código para ejecutar el servidor de backend.
 * 
 * @author Alejandro Moctezuma Luna
 */

// Importación de librerías y controladores
const functions = require("firebase-functions");
const app = require("./app");

// Se inicializa el servidor, el cual estará escuchando por el puerto 3000
// para desarrollo local o por un puerto asignado por el proceso (en caso
// de que se haga deploy al backend en servicios como Heroku)
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Escuchando peticiones en el puerto ${PORT}`);
});

// Se hace deploy a la app de Express
exports.app = functions.https.onRequest(app);