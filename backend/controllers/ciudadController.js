const { ciudadService } = require('../services');
const mongoose = require('mongoose');

/**
 * Implementa los controladores de las rutas de /ciudades:
 * <ul style="list-style: none;">
 *  <li> crearCiudad: Crea una ciudad.
 *  <li> obtenerCiudad: Busca en la BD a una ciudad con el ID de un estado.
 *  <li> actualizarCiudad: Actualiza una ciudad.
 *  <li> borrarCiudad: Borra una ciudad.
 * </ul>
 * @exports ciudadController
 */
module.exports = {
    crearCiudad: async (req, res) => {
        const { 
            estado,
            nombre
        } = req.body;

        let ciudad = { 
            estado,
            nombre 
        };

        const result = await ciudadService.create(ciudad);

        res.status(201).json({
            result
        });
    },
    obtenerCiudad: async (req, res) => {
        // Se convierte el id en un ObjectId de Mongoose
        const id = req.params.id;
        const idEstado = new mongoose.Types.ObjectId(id);

        const result = await ciudadService.getById(idEstado);

        res.status(200).json({
            result
        });
    },
    actualizarCiudad: async (req, res) => {
        const { 
            estado,
            nombre 
        } = req.body;
        const id = req.params.id;

        const result = await ciudadService.update({_id: id}, {
            estado,
            nombre
        });

        res.status(200).json({
            result
        });
    },
    borrarCiudad: async (req, res) => {
        const id = req.params.id;

        const result = await ciudadService.delete({_id: id});

        res.status(200).json({
            result
        });
    }
}