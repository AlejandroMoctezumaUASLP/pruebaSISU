const { estadoService } = require('../services');
const mongoose = require('mongoose');

/**
 * Implementa los controladores de las rutas de /estados:
 * <ul style="list-style: none;">
 *  <li> crearEstado: Crea un estado.
 *  <li> obtenerEstado: Busca en la BD a un estado con el ID de un pais.
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

        const result = await estadoService.create(estado);

        res.status(201).json({
            result
        });
    },
    obtenerEstado: async (req, res) => {
        // Se convierte el id en un ObjectId de Mongoose
        const id = req.params.id;
        const idPais = new mongoose.Types.ObjectId(id);

        const result = await estadoService.getById(idPais);

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

        const result = await estadoService.update({_id: id}, {
            pais,
            nombre
        });

        res.status(200).json({
            result
        });
    },
    borrarEstado: async (req, res) => {
        const id = req.params.id;

        const result = await estadoService.delete({_id: id});

        res.status(200).json({
            result
        });
    }
}