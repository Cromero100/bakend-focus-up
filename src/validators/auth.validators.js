import { checkSchema } from "express-validator";

export const loginValidator = checkSchema({
  correo: {
    notEmpty: {errorMessage:"El correo debe ser diligenciado"},
    isEmail: {errorMessage:"Ingrese un correo válido"},
  },
  contraseña: {
    notEmpty:{errorMessage:"La contraseña debe ser diligenciada"},
  },
});

export const usuarioValidator = checkSchema({
    primerNombre: {
      notEmpty: {
        errorMessage: 'El primer nombre es requerido',
      },
      isLength: {
        options: { min: 2 },
        errorMessage: 'El primer nombre debe tener al menos 2 caracteres',
      },
    },
    segundoNombre: {
      optional: true,  // Es opcional
      isLength: {
        options: { min: 2 },
        errorMessage: 'El segundo nombre debe tener al menos 2 caracteres',
      },
    },
    primerApellido: {
      notEmpty: {
        errorMessage: 'El primer apellido es requerido',
      },
      isLength: {
        options: { min: 2 },
        errorMessage: 'El primer apellido debe tener al menos 2 caracteres',
      },
    },
    segundoApellido: {
      optional: true,  // Es opcional
      isLength: {
        options: { min: 2 },
        errorMessage: 'El segundo apellido debe tener al menos 2 caracteres',
      },
    },
    correo: {
      notEmpty: {
        errorMessage: 'El correo es requerido',
      },
      isEmail: {
        errorMessage: 'Debe proporcionar un correo válido',
      },
    },
    contraseña: {
      notEmpty: {
        errorMessage: 'La contraseña es requerida',
      },
      isLength: {
        options: { min: 6 },
        errorMessage: 'La contraseña debe tener al menos 6 caracteres',
      },
      matches: {
        options: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
        errorMessage: 'La contraseña debe tener al menos una letra mayúscula, una minúscula y un número',
      },
    },
    fechaNacimiento: {
      notEmpty: {
        errorMessage: 'La fecha de nacimiento es requerida',
      },
      isDate: {
        errorMessage: 'Debe proporcionar una fecha válida (YYYY-MM-DD)',
      },
      isBefore:{
        errorMessage:"La fecha de nacimiento debe ser anterior a la actual"
      }
      
    },
    sexo: {
      notEmpty: {
        errorMessage: 'El sexo es requerido',
      },
      isIn: {
        options: [['M', 'F']],
        errorMessage: 'El sexo debe ser "M" o "F"',
      },
    },
  });