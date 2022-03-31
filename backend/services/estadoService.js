import { db } from "../firebase.js";
import { 
    collection,
    doc,
    addDoc,
    getDocs,
    query,
    where,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

/**
 * Implementa los servicios (conexiones a BD) de las rutas de /estados:
 * <ul style="list-style: none;">
 *  <li> createEstado: Crea un Estado.
 *  <li> getEstadosById: Busca en la BD a un estado con ayuda del ID del pais.
 *  <li> updateEstado: Actualiza un estado.
 *  <li> deleteEstado: Borra un estado.
 * </ul>
 * @exports estadoService
 * 
 * @author Alejandro Moctezuma Luna
 */

export const createEstado = async (body) => addDoc(collection(db, "estados"), {...body});
export const getEstadosById = async (idPais) => {
    // Se inicializa la lista de estados ya formateada
    let estados = [];

    // Se obtienen todos los documentos en "estados" que coincidan con el id de Pais
    const estadosRef = collection(db, "estados");
    const estadosQuery = query(estadosRef,where("pais","==",idPais));
    const estadosSnapshot = await getDocs(estadosQuery);

    // Se va formateando la lista de estados a regresar en el API REST
    estadosSnapshot.forEach(doc => {
        const datos = doc.data()
        estados.push({_id: doc.id, ...datos});
    })
    return estados;
};
export const updateEstado = async (id, body) => updateDoc(doc(db,"estados", id), {...body});
export const deleteEstado = async (id) => deleteDoc(doc(db, "estados", id));