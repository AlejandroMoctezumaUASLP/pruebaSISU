import { 
    createUsuario,
    getAllUsuarios,
    updateUsuario,
    deleteUsuario
} from "../services/usuarioService.js";

/**
 * Implementa los controladores de las rutas de /usuarios:
 * <ul style="list-style: none;">
 *  <li> crearUsuario: Crea un usuario.
 *  <li> obtenerUsuarios: Regresa todos los usuarios.
 *  <li> actualizarUsuario: Actualiza un usuario.
 *  <li> borrarUsuario: Borra un usuario.
 * </ul>
 * @exports usuarioController
 */

export const crearUsuario = async (req, res) => {
    const { 
        ciudad,
        nombre,
        edad,
        urlImagen
    } = req.body;
    let usuario = { 
        ciudad,
        nombre,
        edad,
        avatar: urlImagen
    };
    const result = await createUsuario(usuario);
    res.status(201).json({
        result
    });
};

export const obtenerUsuarios = async (req, res) => {
    const result = await getAllUsuarios();
    res.status(200).json({
        result
    });
};

export const actualizarUsuario = async (req, res) => {
    const { 
        ciudad,
        nombre,
        edad,
        urlImagen
    } = req.body;
    const id = req.params.id;
    const result = await updateUsuario(id, {
        ciudad,
        nombre,
        edad,
        avatar: urlImagen
    });
    res.status(200).json({
        result
    });
};

export const borrarUsuario = async (req, res) => {
    const id = req.params.id;
    const result = await deleteUsuario(id);
    res.status(200).json({
        result
    });
};