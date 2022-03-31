const { usuarioService } = require('../services');

/**
 * Implementa los controladores de las rutas de /usuarios:
 * <ul style="list-style: none;">
 *  <li> crearUsuario: Crea un usuario.
 *  <li> obtenerUsuarios: Regresa todos los usuarios.
 *  <li> actualizarUsuario: Actualiza un usuario.
 *  <li> borrarUsuario: Borra un usuario.
 * </ul>
 * @exports usuarioController
 */
module.exports = {
    crearUsuario: async (req, res) => {
        const { 
            ciudad,
            nombre,
            edad,
            urlImagen
        } = req.body;

        let usuario = { 
            ciudad,
            nombre,
            edad,
            avatar: urlImagen
        };

        const result = await usuarioService.create(usuario);

        res.status(201).json({
            result
        });
    },
    obtenerUsuarios: async (req, res) => {
        const result = await usuarioService.getAll();

        res.status(200).json({
            result
        });
    },
    actualizarUsuario: async (req, res) => {
        const { 
            ciudad,
            nombre,
            edad,
            urlImagen
        } = req.body;
        const id = req.params.id;

        const result = await usuarioService.update({_id: id}, {
            ciudad,
            nombre,
            edad,
            avatar: urlImagen
        });

        res.status(200).json({
            result
        });
    },
    borrarUsuario: async (req, res) => {
        const id = req.params.id;

        const result = await usuarioService.delete({_id: id});

        res.status(200).json({
            result
        });
    }
}