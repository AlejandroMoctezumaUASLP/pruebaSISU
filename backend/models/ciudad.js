const mongoose = require('mongoose');

/**
 * Schema de la Ciudad.
 * 
 * @constructor ciudad
 * @property {ObjectId} estado Estado al que pertenece la Ciudad.
 * @property {String} nombre Nombre de la ciudad.
 * 
 * @author Alejandro Moctezuma Luna
 */
const eventSchema = mongoose.Schema({
    estado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Estado"
    },
    nombre: {
        type: String,
        maxlength: 200,
        required: [
            true,
            'Falta el nombre'
        ],
    },
}, {collection: 'Ciudad'});

// Exportación del Modelo y su schema
const Ciudad = mongoose.model('Ciudad', eventSchema);
module.exports.Ciudad = Ciudad;
module.exports.ciudadSchema = eventSchema;