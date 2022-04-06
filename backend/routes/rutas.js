/*******************
 * Rutas de la aplicación. Describen todas las acciones para las colecciones de
 * paises, estados, ciudades y usuarios.
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
const express = require("express");
const { 
    paisController, 
    estadoController, 
    ciudadController, 
    usuarioController
} = require("../controllers");

// Se crea el arreglo de rutas
const router = express.Router();

// CRUD de Paises
router.post("/paises", paisController.crearPais);
router.get("/paises", paisController.obtenerPaises);
router.put("/paises/:id", paisController.actualizarPais);
router.delete("/paises/:id", paisController.borrarPais);

// CRUD de Estados
router.post("/estados", estadoController.crearEstado);
router.get("/estados/:id", estadoController.obtenerEstados);
router.put("/estados/:id", estadoController.actualizarEstado);
router.delete("/estados/:id", estadoController.borrarEstado);

// CRUD de Ciudades
router.post("/ciudades", ciudadController.crearCiudad);
router.get("/ciudades/:id", ciudadController.obtenerCiudades);
router.put("/ciudades/:id", ciudadController.actualizarCiudad);
router.delete("/ciudades/:id", ciudadController.borrarCiudad);

// CRUD de Usuarios
router.post("/usuarios", usuarioController.crearUsuario);
router.get("/usuarios", usuarioController.obtenerUsuarios);
router.put("/usuarios/:id", usuarioController.actualizarUsuario);
router.delete("/usuarios/:id", usuarioController.borrarUsuario);

module.exports = router;