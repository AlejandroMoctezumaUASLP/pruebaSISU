import { 
    createPais,
    getAllPaises,
    updatePais,
    deletePais
} from "../services/paisService.js";

/**
 * Implementa los controladores de las rutas de /paises:
 * <ul style="list-style: none;">
 *  <li> crearPais: Crea un país.
 *  <li> obtenerPaises: Regresa todos los paises.
 *  <li> actualizarPais: Actualiza un pais.
 *  <li> borrarPais: Borra un pais.
 * </ul>
 * @exports paisController
 */

export const crearPais = async (req, res) => {
    const { nombre } = req.body;
    let pais = { nombre };
    const result = await createPais(pais);
    res.status(201).json({
        result
    });
};

export const obtenerPaises = async (req, res) => {
    const result = await getAllPaises();
    res.status(200).json({
        result
    });
};

export const actualizarPais = async (req, res) => {
    const { nombre } = req.body;
    const id = req.params.id;
    const result = await updatePais(id, {
        nombre
    });
    res.status(200).json({
        result
    });
};

export const borrarPais = async (req, res) => {
    const id = req.params.id;
    const result = await deletePais(id);
    res.status(200).json({
        result
    });
};