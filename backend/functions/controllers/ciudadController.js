const { ciudadService } = require("../services");

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
        const result = await ciudadService.createCiudad(ciudad);
        res.status(201).json({
            result
        });
    },
    obtenerCiudades: async (req, res) => {
        const id = req.params.id;
        const result = await ciudadService.getCiudadesById(id);
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
        const result = await ciudadService.updateCiudad(id, {
            estado,
            nombre
        });
        res.status(200).json({
            result
        });
    },
    borrarCiudad: async (req, res) => {
        const id = req.params.id;
        const result = await ciudadService.deleteCiudad(id);
        res.status(200).json({
            result
        });
    }
}