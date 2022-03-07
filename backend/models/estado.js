const mongoose = require('mongoose');

/**
 * Schema del Estado.
 * 
 * @constructor estado
 * @property {ObjectId} pais Pais al que pertenece el Estado.
 * @property {String} nombre Nombre del estado.
 * 
 * @author Alejandro Moctezuma Luna
 */
const eventSchema = mongoose.Schema({
    pais: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pais"
    },
    nombre: {
        type: String,
        maxlength: 200,
        required: [
            true,
            'Falta el nombre'
        ],
    },
}, {collection: 'Estado'});

// Exportación del Modelo y su schema
const Estado = mongoose.model('Estado', eventSchema);
module.exports.Estado = Estado;
module.exports.estadoSchema = eventSchema;