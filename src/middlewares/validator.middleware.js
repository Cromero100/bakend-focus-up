import { validationResult } from "express-validator";

// Middleware para validar las reglas definidas en cada ruta
export const validate = (validations) => async (req,res,next) =>{
    // Ejecutamos todas las validaciones de la ruta
    await Promise.all(
        validations.map( validation => validation.run(req) )
    )
     // Revisamos si hay errores de validación
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors:errors.array(),// Devolvemos el array de errores
            success:false
        })
    }
  // Si todo está bien, continuamos al siguiente middleware o controlador
    next()

}