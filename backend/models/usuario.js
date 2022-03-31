const mongoose = require('mongoose');

/**
 * Schema de la Usuario.
 * 
 * @constructor usuario
 * @property {ObjectId} ciudad Ciudad al que pertenece el Usuario.
 * @property {String} nombre Nombre del usuario.
 * @property {Number} edad Edad del usuario.
 * 
 * @author Alejandro Moctezuma Luna
 */
const eventSchema = mongoose.Schema({
    ciudad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ciudad"
    },
    nombre: {
        type: String,
        maxlength: 200,
        required: [
            true,
            'Falta el nombre'
        ],
    },
    edad: {
        type: Number,
        required: [
            true,
            'Falta la edad'
        ],
    },
    avatar: {
        type: String,
        maxlength: 500,
        required: [
            true,
            'Falta imagen de perfil'
        ]
    },
}, {collection: 'Usuario'});

// Exportación del Modelo y su schema
const Usuario = mongoose.model('Usuario', eventSchema);
module.exports.Usuario = Usuario;
module.exports.usuarioSchema = eventSchema;