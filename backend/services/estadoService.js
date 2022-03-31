// const { Estado } = require('../models');
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
 * Implementa los servicios (conexiones a BD) de las rutas de /estados:
 * <ul style="list-style: none;">
 *  <li> create: Crea un Estado.
 *  <li> getById: Busca en la BD a un estado con ayuda del ID del pais.
 *  <li> update: Actualiza un estado.
 *  <li> delete: Borra un estado.
 * </ul>
 * @exports estadoService
 * 
 * @author Alejandro Moctezuma Luna
 */
module.exports = {
    create: async (body) => new Estado(body).save(),
    getById: async (idPais) => Estado.find({ pais: idPais }),
    update: async (_id, body) => Estado.findByIdAndUpdate(_id,body),
    delete: async (id) => Estado.findByIdAndRemove(id)
}