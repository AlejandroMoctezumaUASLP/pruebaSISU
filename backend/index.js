/*******************
 * Código principal del backend. Se describe la estructura de un API REST
 * tanto con los métodos originales del servicio web original como con algunos
 * métodos nuevos para llenar los registros de las colecciones. Las rutas
 * del REST API son:
 * 
 * Rutas de /paises:
 * 
 * <ul style="list-style: none;">
 *  <li> [POST] /paises: Crea un país
 *  <li> [GET] /paises: Obtiene la lista de paises
 *  <li> [PUT] /paises/:id: Actualiza el registro del país
 *  <li> [DELETE] /paises/:id: Elimina el registro del país
 * </ul>
 * 
 * Rutas de /estados:
 * 
 * <ul style="list-style: none;">
 *  <li> [POST] /estados: Crea un estado
 *  <li> [GET] /estados/:id: Obtiene un estado con el ID de un país
 *  <li> [PUT] /estados/:id: Actualiza el registro del estado
 *  <li> [DELETE] /estados/:id: Elimina el registro del estado
 * </ul>
 * 
 * Rutas de /ciudades:
 * 
 * <ul style="list-style: none;">
 *  <li> [POST] /ciudades: Crea una ciudad
 *  <li> [GET] /ciudades/:id: Obtiene una ciudad con el ID de un estado
 *  <li> [PUT] /ciudades/:id: Actualiza el registro de la ciudad
 *  <li> [DELETE] /ciudades/:id: Elimina el registro de la ciudad
 * </ul>
 * 
 * Rutas de /usuarios:
 * 
 * <ul style="list-style: none;">
 *  <li> [POST] /usuarios: Crea un usuario
 *  <li> [GET] /usuarios: Obtiene la lista de usuarios
 *  <li> [PUT] /usuarios/:id: Actualiza el registro del usuario
 *  <li> [DELETE] /usuarios/:id: Elimina el registro del usuario
 * </ul>
 * 
 * @author Alejandro Moctezuma Luna
 */

// Importación de librerías y controladores
import express from "express";
import cors from "cors";

// Controlador de Pais
import { 
    crearPais,
    obtenerPaises,
    actualizarPais,
    borrarPais
} from "./controllers/paisController.js";

// Controlador de Estado
import { 
    crearEstado,
    obtenerEstados,
    actualizarEstado,
    borrarEstado
} from "./controllers/estadoController.js";

// Controlador de Ciudad
import { 
    crearCiudad,
    obtenerCiudades,
    actualizarCiudad,
    borrarCiudad
} from "./controllers/ciudadController.js";

// Controlador de Usuario
import { 
    crearUsuario,
    obtenerUsuarios,
    actualizarUsuario,
    borrarUsuario
} from "./controllers/usuarioController.js";

// Se configura Express y Cors para hacer funcionar el API REST
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Se crea el arreglo de rutas
const router = express.Router();

// CRUD de Paises
router.post("/paises", crearPais);
router.get("/paises", obtenerPaises);
router.put("/paises/:id", actualizarPais);
router.delete("/paises/:id", borrarPais);

// CRUD de Estados
router.post("/estados", crearEstado);
router.get("/estados/:id", obtenerEstados);
router.put("/estados/:id", actualizarEstado);
router.delete("/estados/:id", borrarEstado);

// CRUD de Ciudades
router.post("/ciudades", crearCiudad);
router.get("/ciudades/:id", obtenerCiudades);
router.put("/ciudades/:id", actualizarCiudad);
router.delete("/ciudades/:id", borrarCiudad);

// CRUD de Usuarios
router.post("/usuarios", crearUsuario);
router.get("/usuarios", obtenerUsuarios);
router.put("/usuarios/:id", actualizarUsuario);
router.delete("/usuarios/:id", borrarUsuario);

// Se pasa el router al api
app.use('/servicio', router);

// Se inicializa el servidor, el cual estará escuchando por el puerto 8000
app.listen(8000, () => {
    console.log('Listening port: 8000');
});