import { Router } from "express";
import usuarioController from "../controllers/usuario.controller.js";

const routerUsuarios = Router();

routerUsuarios.get("/usuarios", usuarioController.getAllUsuarios); // Obtener todos los usuarios
routerUsuarios.get("/usuarios/:id",usuarioController.getUsuario); // Obtener un usuario por ID
routerUsuarios.put("/usuarios/:id", usuarioController.putUsuario); // Actualizar un usuario por ID
routerUsuarios.delete("/usuarios/:id", usuarioController.deleteUsuarioController); // Eliminar un usuario por ID

export default routerUsuarios;
