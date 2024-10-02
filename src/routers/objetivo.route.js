import { Router } from "express";
import objetivoController from "../controllers/objetivo.controller.js";
import { verifyToken } from "../middlewares/token.middleware.js";

const routerObjetivos = Router();

// Rutas públicas (no requieren token)
routerObjetivos.get("/objetivos", objetivoController.getAllObjetivos);// Ruta para obtener todos los objetivos
routerObjetivos.get("/objetivos/:id", objetivoController.getObjetivoController);// Ruta para obtener un objetivo por su ID

// Rutas protegidas (requieren token)
routerObjetivos.post("/objetivos", verifyToken,objetivoController.postObjetivoController);// Ruta para crear un nuevo objetivo
routerObjetivos.put("/objetivos/:id", verifyToken,objetivoController.putObjetivoController);// Ruta para actualizar un objetivo por su ID
routerObjetivos.delete("/objetivos/:id", verifyToken,objetivoController.deleteObjetivoController);// Ruta para eliminar un objetivo por su ID

export default routerObjetivos;
