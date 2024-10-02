import { Router } from "express";
import routerAuth from "./auth.route.js";
import routerUsuarios from "./usuario.route.js";
import routerObjetivos from "./objetivo.route.js";


const route = Router();

route.use("/auth", routerAuth )
route.use("/api", routerObjetivos); //ruta de usuarios
route.use("/api", routerUsuarios); //ruta de objetivos

export default route;



