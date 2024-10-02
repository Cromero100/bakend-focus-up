import express from "express";
import { environment } from "./default.js"
import route from "../routers/index.route.js";
import MongoConnection from "../service/mongoConnection.service.js"; // Cambiado a MongoConnection
import middleware from "../middlewares/index.middlewares.js";

export default class Server {

    constructor(){
        this.app = express()
        this.port = environment.port
    }

   async connectionDB() {
    new MongoConnection();
    }

    middlewares(){
        this.app.use(express.json())
        // Activo el uso de middleware personalizado 
        this.app.use(middleware)

    }

    route(){
        this.app.use(route)

    }

    runServer(){
        this.connectionDB(),
        this.middlewares(),
        this.route(),
        this.app.listen(this.port , () => {
            console.log('Running on port ', 8000);
        })
        
    }

}