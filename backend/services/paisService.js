import { db } from "../firebase.js";
import { 
    collection,
    doc,
    addDoc,
    getDocs,
    collectionGroup,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

/**
 * Implementa los servicios (conexiones a BD) de las rutas de /paises:
 * <ul style="list-style: none;">
 *  <li> createPais: Crea un país.
 *  <li> getAllPaises: Regresa todos los paises.
 *  <li> updatePais: Actualiza un pais.
 *  <li> deletePais: Borra un pais.
 * </ul>
 * @exports paisService
 * 
 * @author Alejandro Moctezuma Luna
 */

export const createPais = async (body) => addDoc(collection(db, "paises"), {...body});
export const getAllPaises = async () => {
    // Se inicializa la lista de paises ya formateada
    let paises = [];

    // Se obtienen todos los documentos en "paises"
    const paisesSnapshot = await getDocs(collectionGroup(db, "paises"));

    // Se va formateando la lista de paises a regresar en el API REST
    paisesSnapshot.forEach(doc => {
        const datos = doc.data()
        paises.push({_id: doc.id, ...datos});
    })
    return paises;
};
export const updatePais = async (id, body) => updateDoc(doc(db,"paises", id), {...body});
export const deletePais = async (id) => deleteDoc(doc(db, "paises", id));