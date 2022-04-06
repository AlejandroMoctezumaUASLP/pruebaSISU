/*******************
 * Código principal de la ruta de Express. La aplicación está configurada para
 * aceptar JSONs. Usa el body parser integrado (urlencoded, extended: true).
 * Tiene activado el uso de cors. La aplicación se exporta para que index.js
 * la pueda usar
 * 
 * Las rutas utilizadas se encuentran en el archivo "rutas.js" de "routes"
 * 
 * @author Alejandro Moctezuma Luna
 */

// Importación de librerías y controladores
const express = require("express");
const cors = require("cors");
const rutas = require("./routes/rutas");

// Se configura Express y Cors para hacer funcionar el API REST
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Se pasa el router al api
app.use('/servicio', rutas);

module.exports = app;