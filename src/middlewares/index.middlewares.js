import { Router } from "express";
import { verifyToken } from "./token.middleware.js";

const middleware = Router();

// Aplicamos el middleware de verificación de token a todas las rutas bajo /api
middleware.use("/api", verifyToken);


export default middleware