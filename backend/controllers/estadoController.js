import { 
    createEstado,
    getEstadosById,
    updateEstado,
    deleteEstado
} from "../services/estadoService.js";

/**
 * Implementa los controladores de las rutas de /estados:
 * <ul style="list-style: none;">
 *  <li> crearEstado: Crea un estado.
 *  <li> obtenerEstados: Busca en la BD a un estado con el ID de un pais.
 *  <li> actualizarEstado: Actualiza un estado.
 *  <li> borrarEstado: Borra un estado.
 * </ul>
 * @exports estadoController
 */

export const crearEstado = async (req, res) => {
    const { 
        pais,
        nombre
    } = req.body;
    let estado = { 
        pais,
        nombre 
    };
    const result = await createEstado(estado);
    res.status(201).json({
        result
    });
};

export const obtenerEstados = async (req, res) => {
    const id = req.params.id;
    const result = await getEstadosById(id);
    res.status(200).json({
        result
    });
};

export const actualizarEstado = async (req, res) => {
    const { 
        pais,
        nombre 
    } = req.body;
    const id = req.params.id;
    const result = await updateEstado(id, {
        pais,
        nombre
    });
    res.status(200).json({
        result
    });
};

export const borrarEstado = async (req, res) => {
    const id = req.params.id;
    const result = await deleteEstado(id);
    res.status(200).json({
        result
    });
};