const mongoose = require('mongoose');

/**
 * Schema del Pais.
 * 
 * @constructor pais
 * @property {String} nombre Nombre del pais.
 * 
 * @author Alejandro Moctezuma Luna
 */
const eventSchema = mongoose.Schema({
    nombre: {
        type: String,
        maxlength: 200,
        required: [
            true,
            'Falta el nombre'
        ],
    },
}, {collection: 'Pais'});

// Exportación del Modelo y su schema
const Pais = mongoose.model('Pais', eventSchema);
module.exports.Pais = Pais;
module.exports.paisSchema = eventSchema;