import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";  // para comparar las contraseñas
import {Usuario} from "../models/usuario.model.js";  // Modelo del usuario
import { environment } from "../config/default.js";  // Configuración de tu JWT

export const login = async (req, res) => {
    const { correo, contraseña } = req.body;  // Recibe correo y contraseña desde el frontend
    
    try {
        // Buscar el usuario en la base de datos por correo
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(404).json({
                success: false,
                msg: "Usuario no encontrado"
            });
        }

        // Verificar si la contraseña es correcta
        const esContraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!esContraseñaCorrecta) {
            return res.status(401).json({
                success: false,
                msg: "Contraseña incorrecta"
            });
        }

        // Generar el token JWT
        const token = Jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),  // Expira en 1 hora
            data: {
                id: usuario._id,
                nombre: usuario.primerNombre,
                correo: usuario.correo,
            }
        }, environment.jwt_hash);

        // Devolver el token al usuario
        res.status(200).json({
            success: true,
            token: `Bearer ${token}`  // Prefijamos el token con 'Bearer'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error en el servidor",
            error: error.message
        });
    }
};
