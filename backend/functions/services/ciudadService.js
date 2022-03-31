const { db } = require("../firebase.js");
const { 
    collection,
    doc,
    addDoc,
    getDocs,
    query,
    where,
    updateDoc,
    deleteDoc
} = require("firebase/firestore");

/**
 * Implementa los servicios (conexiones a BD) de las rutas de /ciudades:
 * <ul style="list-style: none;">
 *  <li> createCiudad: Crea una Ciudad.
 *  <li> getCiudadesById: Busca en la BD a una ciudad con ayuda del ID del Estado.
 *  <li> updateCiudad: Actualiza una ciudad.
 *  <li> deleteCiudad: Borra una ciudad.
 * </ul>
 * @exports ciudadService
 * 
 * @author Alejandro Moctezuma Luna
 */

module.exports = {
    createCiudad: async (body) => addDoc(collection(db, "ciudades"), {...body}),
    getCiudadesById: async (idEstado) => {
        // Se inicializa la lista de ciudades ya formateada
        let ciudades = [];
    
        // Se obtienen todos los documentos en "ciudades" que coincidan con el id de Estado
        const ciudadesRef = collection(db, "ciudades");
        const ciudadesQuery = query(ciudadesRef,where("estado","==",idEstado));
        const ciudadesSnapshot = await getDocs(ciudadesQuery);
    
        // Se va formateando la lista de estados a regresar en el API REST
        ciudadesSnapshot.forEach(doc => {
            const datos = doc.data()
            ciudades.push({_id: doc.id, ...datos});
        })
        return ciudades;
    },
    updateCiudad: async (id, body) => updateDoc(doc(db,"ciudades", id), {...body}),
    deleteCiudad: async (id) => deleteDoc(doc(db, "ciudades", id))
}