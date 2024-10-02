// src/service/mongoConnection.service.js
import mongoose from "mongoose";
import { environment } from "../config/default.js";

export default class MongoConnection {
  static instance;
  connection;

  constructor() {
    if (MongoConnection.instance) {
      return MongoConnection.instance;
    }

    MongoConnection.instance = this;
    
    // Conexión a MongoDB
    mongoose.connect(environment.db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Conexión a MongoDB exitosa');
    })
    .catch((error) => {
      console.log('Error al conectar a MongoDB: ', error.message || error);
    });
  }
}
