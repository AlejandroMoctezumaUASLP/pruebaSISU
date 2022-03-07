const { paisService } = require('../services');

/**
 * Implementa los controladores de las rutas de /pacientes:
 * <ul style="list-style: none;">
 *  <li> crearPais: Crea un país.
 *  <li> obtenerPaises: Regresa todos los paises.
 *  <li> actualizarPais: Actualiza un pais.
 *  <li> borrarPais: Borra un pais.
 * </ul>
 * @exports paisController
 */
module.exports = {
    crearPais: async (req, res) => {
        const { nombre } = req.body;

        let pais = { nombre };

        const result = await paisService.create(pais);

        res.status(201).json({
            result
        });
    },
    obtenerPaises: async (req, res) => {
        const result = await paisService.getAll();

        res.status(200).json({
            result
        });
    },
    actualizarPais: async (req, res) => {
        const { nombre } = req.body;
        const id = req.params.id;

        const result = await paisService.update({_id: id}, {
            nombre
        });

        res.status(200).json({
            result
        });
    },
    borrarPais: async (req, res) => {
        const id = req.params.id;

        const result = await paisService.delete({_id: id});

        res.status(200).json({
            result
        });
    }
}