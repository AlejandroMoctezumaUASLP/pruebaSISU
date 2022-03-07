const { Pais } = require('../models');

/**
 * Implementa los servicios (conexiones a BD) de las rutas de /paises:
 * <ul style="list-style: none;">
 *  <li> create: Crea un país.
 *  <li> getAll: Regresa todos los paises.
 *  <li> update: Actualiza un pais.
 *  <li> delete: Borra un pais.
 * </ul>
 * @exports paisService
 * 
 * @author Alejandro Moctezuma Luna
 */
module.exports = {
    create: async (body) => new Pais(body).save(),
    getAll: async () => Pais.find({}),
    update: async (_id, body) => Pais.findByIdAndUpdate(_id,body),
    delete: async (id) => Pais.findByIdAndRemove(id)
}