import jwt from "jsonwebtoken"
import { environment } from "../config/default.js";

export const verifyToken = (req,res,next)=>{
    // Extraemos el token del header "authorization"
     let token = req.headers["authorization"];

      //verifica que el token no exista 
     if ( !token ) {
      //si el token existe restorna una respuesta
         return  res.status(401).json({
            success: false,
            msg : 'authorization required 1' 
    
     })
   }

   token = token.split(" ");
   //verifico que la authorization sea Bearer
   if (token[0] !== "Bearer") {
      //Retorno una respuesta de autorizacion requerida
      return  res.status(401).json({
         success: false,
         msg : 'authorization required 2' 
 
      })
   }

   jwt.verify(token[1] , environment.jwt_hash , (error,decode)=> {
      // si el token tiene un error
         if (error) {
            //devolvemos la respuesta de error
            return res.status(401).json({
               success : false,
               msg : 'authorization required 3'
            })
          
         }
         req.user = decode.data;
         //continuar con el siguiente middleware
         next();
   })
}