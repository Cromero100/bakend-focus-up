import { Router } from "express";
import routerAuth from "./auth.route.js";
import routerUsuarios from "./usuario.route.js";
import routerObjetivos from "./objetivo.route.js";

const route = Router();

route.use("/auth", routerAuth);
route.use("/api", routerObjetivos); //ruta de usuarios
route.use("/api", routerUsuarios); //ruta de objetivos

route.all("/auth/login", (req, res, next) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: `Método ${req.method} no permitido en la ruta /auth/login. Debe usar POST.`,
    });
  }
  next();
});

route.use((req, res, next) => {
  res.status(404).json({
    error: "Ruta no encontrada. Verifique la URL.",
  });
});
export default route;
