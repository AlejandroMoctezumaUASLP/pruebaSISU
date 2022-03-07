const { Ciudad } = require('../models');

/**
 * Implementa los servicios (conexiones a BD) de las rutas de /ciudades:
 * <ul style="list-style: none;">
 *  <li> create: Crea una Ciudad.
 *  <li> getById: Busca en la BD a una ciudad con ayuda del ID del Estado.
 *  <li> update: Actualiza una ciudad.
 *  <li> delete: Borra una ciudad.
 * </ul>
 * @exports ciudadService
 * 
 * @author Alejandro Moctezuma Luna
 */
module.exports = {
    create: async (body) => new Ciudad(body).save(),
    getById: async (idEstado) => Ciudad.find({ estado: idEstado }),
    update: async (_id, body) => Ciudad.findByIdAndUpdate(_id,body),
    delete: async (id) => Ciudad.findByIdAndRemove(id)
}