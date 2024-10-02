import { checkSchema } from "express-validator";

export const createObjetiveValidator = checkSchema({
  usuarioId: {
    notEmpty: {
      errorMessage: "El usuario asociado es obligatorio",
    },
    isMongoId: {
      errorMessage: "El usuarioId debe ser un ID válido de MongoDB",
    },
  },
  nombre: {
    notEmpty: { errorMessage: "Nombre del objetivo obligatorio" },
  },
  descripcion: {
    notEmpty: { errorMessage: "Descripcion del objetivo obligatorio" },
  },
  fechaFinalizacion: {
    isAfter: {
      errorMessage: "La fecha de finalización debe ser posterior a la actual",
    },
  },
  prioridad: {
    optional: true,
    isIn: {
      options: [["Baja", "Mediana", "Alta"]],
      errorMessage: "La prioridad debe ser 'Baja', 'Mediana' o 'Alta'",
    },
  },
  categoria: {
    notEmpty: {
      errorMessage: "La categoría es obligatoria",
    },
    isIn: {
      options: [["Personal", "Profesional", "Otra"]],
      errorMessage: "La categoría debe ser 'Personal', 'Profesional' o 'Otra'",
    },
  },
  rememberDays: {
    optional: true,
    isIn: {
      options: [
        [
          "Lunes",
          "Martes",
          "Miercoles",
          "Jueves",
          "Viernes",
          "Sábado",
          "Domingo",
        ],
      ],
      errorMessage: "Digite bien el nombre del día de la semana",
    },
  },
  "subObjetivos.*.titulo": {
    notEmpty: {
      errorMessage: "El título de cada subobjetivo es obligatorio",
    },
    isString: {
      errorMessage: "El título debe ser un texto",
    },
  },
  "subObjetivos.*.descripcion": {
    notEmpty: {
      errorMessage: "La descripción de cada subobjetivo es obligatoria",
    },
    isString: {
      errorMessage: "La descripción debe ser un texto",
    },
  },
});

export const updateObjetivoObjetiveValidator = checkSchema({
    id: {
        in: ['params'], // Indica que el campo está en los parámetros de la URL
        isMongoId: {
          errorMessage: "El id debe ser un ID válido de MongoDB",
        },
      },
    usuarioId: {
      notEmpty: {
        errorMessage: "El usuario asociado es obligatorio",
      },
      isMongoId: {
        errorMessage: "El usuarioId debe ser un ID válido de MongoDB",
      },
    },
    nombre: {
      notEmpty: { errorMessage: "Nombre del objetivo obligatorio" },
    },
    descripcion: {
      notEmpty: { errorMessage: "Descripcion del objetivo obligatorio" },
    },
    fechaFinalizacion: {
      isAfter: {
        errorMessage: "La fecha de finalización debe ser posterior a la actual",
      },
    },
    prioridad: {
      optional: true,
      isIn: {
        options: [["Baja", "Mediana", "Alta"]],
        errorMessage: "La prioridad debe ser 'Baja', 'Mediana' o 'Alta'",
      },
    },
    categoria: {
      notEmpty: {
        errorMessage: "La categoría es obligatoria",
      },
      isIn: {
        options: [["Personal", "Profesional", "Otra"]],
        errorMessage: "La categoría debe ser 'Personal', 'Profesional' o 'Otra'",
      },
    },
    completado:{
        notEmpty:{
            errorMessage:"Completado obligatorio"
        }
    },
    rememberDays: {
      optional: true,
      isIn: {
        options: [
          [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sábado",
            "Domingo",
          ],
        ],
        errorMessage: "Digite bien el nombre del día de la semana",
      },
    },
    "subObjetivos.*.titulo": {
      notEmpty: {
        errorMessage: "El título de cada subobjetivo es obligatorio",
      },
      isString: {
        errorMessage: "El título debe ser un texto",
      },
    },
    "subObjetivos.*.descripcion": {
      notEmpty: {
        errorMessage: "La descripción de cada subobjetivo es obligatoria",
      },
      isString: {
        errorMessage: "La descripción debe ser un texto",
      },
    },
  });

  export const deleteObjetivoObjetiveValidator = checkSchema({
    id: {
        in: ['params'],
        isMongoId: {
          errorMessage: "El id debe ser un ID válido de MongoDB",
        },
      },
  })

  export const getObjetivoByIdValidator = checkSchema({
    id: {
        in: ['params'],
        isMongoId: {
          errorMessage: "El id debe ser un ID válido de MongoDB",
        },
      },
  })
  
