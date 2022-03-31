// const { Usuario } = require('../models');
import { db } from "../firebase";
import { 
    collection,
    doc,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

/**
 * Implementa los servicios (conexiones a BD) de las rutas de /usuarios:
 * <ul style="list-style: none;">
 *  <li> create: Crea un Usuario.
 *  <li> getAll: Regresa todos los usuarios.
 *  <li> update: Actualiza a un usuario.
 *  <li> delete: Borra un usuario.
 * </ul>
 * @exports usuarioService
 * 
 * @author Alejandro Moctezuma Luna
 */
module.exports = {
    create: async (body) => new Usuario(body).save(),
    getAll: async () => Usuario.find({}).populate("ciudad"),
    update: async (_id, body) => Usuario.findByIdAndUpdate(_id,body),
    delete: async (id) => Usuario.findByIdAndRemove(id)
}