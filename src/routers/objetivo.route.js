import { Router } from "express";
import objetivoController from "../controllers/objetivo.controller.js";
import { verifyToken } from "../middlewares/token.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { createObjetiveValidator, updateObjetivoObjetiveValidator, deleteObjetivoObjetiveValidator,getObjetivoByIdValidator } from "../validators/objetivo.validators.js";

const routerObjetivos = Router();

// Rutas públicas (no requieren token)
routerObjetivos.get("/objetivos", objetivoController.getAllObjetivos);// Ruta para obtener todos los objetivos
routerObjetivos.get("/objetivos/:id",validate(getObjetivoByIdValidator), objetivoController.getObjetivoController);// Ruta para obtener un objetivo por su ID

// Rutas protegidas (requieren token)
routerObjetivos.post("/objetivos", verifyToken, validate(createObjetiveValidator), objetivoController.postObjetivoController);// Ruta para crear un nuevo objetivo
routerObjetivos.put("/objetivos/:id", verifyToken,validate(updateObjetivoObjetiveValidator),objetivoController.putObjetivoController);// Ruta para actualizar un objetivo por su ID
routerObjetivos.delete("/objetivos/:id", verifyToken,validate(deleteObjetivoObjetiveValidator), objetivoController.deleteObjetivoController);// Ruta para eliminar un objetivo por su ID

export default routerObjetivos;
