const { estadoService } = require("../services");

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

module.exports = {
    crearEstado: async (req, res) => {
        const { 
            pais,
            nombre
        } = req.body;
        let estado = { 
            pais,
            nombre 
        };
        const result = await estadoService.createEstado(estado);
        res.status(201).json({
            result
        });
    },
    obtenerEstados: async (req, res) => {
        const id = req.params.id;
        const result = await estadoService.getEstadosById(id);
        res.status(200).json({
            result
        });
    },
    actualizarEstado: async (req, res) => {
        const { 
            pais,
            nombre 
        } = req.body;
        const id = req.params.id;
        const result = await estadoService.updateEstado(id, {
            pais,
            nombre
        });
        res.status(200).json({
            result
        });
    },
    borrarEstado: async (req, res) => {
        const id = req.params.id;
        const result = await estadoService.deleteEstado(id);
        res.status(200).json({
            result
        });
    }
}