const { paisService } = require("../services");

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

module.exports = {
    crearPais: async (req, res) => {
        const { nombre } = req.body;
        let pais = { nombre };
        const result = await paisService.createPais(pais);
        res.status(201).json({
            result
        });
    },
    obtenerPaises: async (req, res) => {
        const result = await paisService.getAllPaises();
        res.status(200).json({
            result
        });
    },
    actualizarPais: async (req, res) => {
        const { nombre } = req.body;
        const id = req.params.id;
        const result = await paisService.updatePais(id, {
            nombre
        });
        res.status(200).json({
            result
        });
    },
    borrarPais: async (req, res) => {
        const id = req.params.id;
        const result = await paisService.deletePais(id);
        res.status(200).json({
            result
        });
    }
}