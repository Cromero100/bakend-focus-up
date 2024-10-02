import { getUsuarios, getUsuarioById, getUsuarioByCorreo, createUsuario, updateUsuario, deleteUsuario } from "../models/usuario.model.js";

// Obtener todos los usuarios
export async function getAllUsuarios(req, res) {
    try {
        const usuarios = await getUsuarios();
        res.status(200).json({
            success: true,
            msg: "Lista de todos los usuarios",
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener usuarios",
            error: error.message
        });
    }
}

// Obtener un usuario por su ID
export async function getUsuario(req, res) {
    const { id } = req.params;
    try {
        const usuario = await getUsuarioById(id);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado"
            });
        }
        res.status(200).json({
            success: true,
            data: usuario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al obtener el usuario",
            error: error.message
        });
    }
}

// Crear un nuevo usuario
export async function postUsuario(req, res) {
    const {primerNombre, segundoNombre, primerApellido, segundoApellido, correo, contraseña, fechaNacimiento, sexo } = req.body;
    try {
        const usuarioExistente = await getUsuarioByCorreo(correo);
        if (usuarioExistente) {
            return res.status(400).json({
                success: false,
                msg: "El correo ya está registrado"
            });
        }

        const nuevoUsuario = await createUsuario(primerNombre, segundoNombre, primerApellido, segundoApellido, correo, contraseña, fechaNacimiento, sexo );
        res.status(201).json({
            success: true,
            msg: "Usuario creado exitosamente",
            data: nuevoUsuario
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al crear el usuario",
            error: error.message
        });
    }
}

// Actualizar un usuario por su ID
export async function putUsuario(req, res) {
    const { id } = req.params;
    const {primerNombre, segundoNombre, primerApellido, segundoApellido, correo, contraseña, fechaNacimiento, sexo } = req.body;
    try {
        const usuarioActualizado = await updateUsuario(id, primerNombre, segundoNombre, primerApellido, segundoApellido, correo, contraseña, fechaNacimiento, sexo );
        if (!usuarioActualizado) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado"
            });
        }
        res.status(200).json({
            success: true,
            msg: "Usuario actualizado exitosamente",
            data: usuarioActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al actualizar el usuario",
            error: error.message
        });
    }
}

// Eliminar un usuario por su ID
export async function deleteUsuarioController(req, res) {
    const { id } = req.params;
    try {
        const usuarioEliminado = await deleteUsuario(id);
        if (!usuarioEliminado) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado"
            });
        }
        res.status(200).json({
            success: true,
            msg: "Usuario eliminado exitosamente",
            data: usuarioEliminado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error al eliminar el usuario",
            error: error.message
        });
    }
}

export default {
    getAllUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuarioController,
};
