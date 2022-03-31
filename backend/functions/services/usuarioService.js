const { db } = require("../firebase.js");
const { 
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    collectionGroup,
    updateDoc,
    deleteDoc
} = require("firebase/firestore");

/**
 * Implementa los servicios (conexiones a BD) de las rutas de /usuarios:
 * <ul style="list-style: none;">
 *  <li> createUsuario: Crea un Usuario.
 *  <li> getAllUsuarios: Regresa todos los usuarios.
 *  <li> updateUsuario: Actualiza a un usuario.
 *  <li> deleteUsuario: Borra un usuario.
 * </ul>
 * @exports usuarioService
 * 
 * @author Alejandro Moctezuma Luna
 */

module.exports = {
    createUsuario: async (body) => addDoc(collection(db, "usuarios"), {...body}),
    getAllUsuarios: async () => {
        // Se inicializa la lista de usuarios ya formateada
        let usuarios = [];
    
        // Se obtienen todos los documentos en "usuarios"
        const usuariosSnapshot = await getDocs(collectionGroup(db, "usuarios"));
    
        // Se va formateando la lista de usuarios a regresar en el API REST
        for(const document of usuariosSnapshot.docs) {
            const datos = document.data()
            const { 
                ciudad, 
                nombre, 
                edad, 
                avatar 
            } = datos;
    
            // En base a la ID de la ciudad, creamos un objeto con dichos datos
            const ciudadObjeto = await getDoc(doc(db, "ciudades", ciudad))
            const ciudadInfo = ciudadObjeto.data();
            const ciudadDatos = {
                _id: ciudad,
                ...ciudadInfo
            }
    
            // Empujamos los datos al objeto a regresar
            usuarios.push({_id: document.id, nombre, edad, avatar, ciudad: ciudadDatos});
        }
    
        return usuarios;
    },
    updateUsuario: async (id, body) => updateDoc(doc(db,"usuarios", id), {...body}),
    deleteUsuario: async (id) => deleteDoc(doc(db, "usuarios", id))
}