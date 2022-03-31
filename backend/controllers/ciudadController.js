import { 
    createCiudad,
    getCiudadesById,
    updateCiudad,
    deleteCiudad
} from "../services/ciudadService.js";

/**
 * Implementa los controladores de las rutas de /ciudades:
 * <ul style="list-style: none;">
 *  <li> crearCiudad: Crea una ciudad.
 *  <li> obtenerCiudades: Busca en la BD a una ciudad con el ID de un estado.
 *  <li> actualizarCiudad: Actualiza una ciudad.
 *  <li> borrarCiudad: Borra una ciudad.
 * </ul>
 * @exports ciudadController
 */

export const crearCiudad = async (req, res) => {
    const { 
        estado,
        nombre
    } = req.body;
    let ciudad = { 
        estado,
        nombre 
    };
    const result = await createCiudad(ciudad);
    res.status(201).json({
        result
    });
};

export const obtenerCiudades = async (req, res) => {
    const id = req.params.id;
    const result = await getCiudadesById(id);
    res.status(200).json({
        result
    });
};

export const actualizarCiudad = async (req, res) => {
    const { 
        estado,
        nombre 
    } = req.body;
    const id = req.params.id;
    const result = await updateCiudad(id, {
        estado,
        nombre
    });
    res.status(200).json({
        result
    });
};

export const borrarCiudad = async (req, res) => {
    const id = req.params.id;
    const result = await deleteCiudad(id);
    res.status(200).json({
        result
    });
};