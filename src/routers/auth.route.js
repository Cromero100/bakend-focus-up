import {Router} from "express";
import { login } from "../controllers/auth.controller.js";
import { postUsuario } from "../controllers/usuario.controller.js";
import { Usuario } from "../models/usuario.model.js"; // Asegúrate de importar el modelo

const router = Router();

// Cambiamos a POST para enviar las credenciales en el cuerpo de la petición
router.post("/login", login);

// Ruta para registro
//router.post("/registro", postUsuario); // Añadir la ruta de registro


// Ruta para registrar un nuevo usuario
router.post('/registro', async (req, res) => {
    console.log(req.body); // Imprime el cuerpo de la solicitud para depuración
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json({ success: true, data: nuevoUsuario });
    } catch (error) {
        res.status(400).json({ success: false, msg: 'Error al crear el usuario', error: error.message });
    }
});

export default router;