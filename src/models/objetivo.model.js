// src/models/objetivo.model.js
import mongoose from "mongoose";

const subObjetivoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  completado: { type: Boolean, default: false }, // Indica si el subobjetivo está completado o no
});

const objetivoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  fechaFinalizacion: { type: Date, required: true }, // Nueva fecha de finalización
  prioridad: {
    type: String,
    enum: ["Baja", "Mediana", "Alta"], // Prioridad con valores permitidos
    default: "Mediana",
    required: true, // Valor por defecto si no se proporciona
  },
  categoria: {
    type: String,
    enum: ["Personal", "Profesional", "Otra"],
    default: "Personal", // Categorías posibles
    required: true,
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true, // Aseguramos que un objetivo siempre esté asociado a un usuario
  },
  completado: { type: Boolean, default: false },
  subObjetivos: [subObjetivoSchema],
  rememberDays: { type: [String], default: [] },
});

// Modelo de Objetivo
export const Objetivo = mongoose.model("Objetivo", objetivoSchema);

// Obtener todos los objetivos
export const getObjetivos = async () => {
  return await Objetivo.find();
};

// Obtener un objetivo por ID
export const getObjetivoById = async (id) => {
  try {
    return await Objetivo.findById(id);
  } catch (error) {
    return null;
  }
};

// Crear un nuevo objetivo
export const createObjetivo = async (
  nombre,
  descripcion,
  usuarioId,
  fechaFinalizacion,
  prioridad,
  categoria,
  subObjetivos,
  rememberDays
) => {
  const nuevoObjetivo = new Objetivo({
    nombre,
    descripcion,
    usuarioId,
    fechaFinalizacion, // Incluimos la nueva fecha de finalización
    prioridad,
    categoria,
    subObjetivos,
    rememberDays,
  });
  console.log("HP MRD",subObjetivos)
  try {
    
    const savedObjetivo = await nuevoObjetivo.save();
    console.log("Objetivo guardado:", savedObjetivo);
    return savedObjetivo;
  } catch (error) {
    console.error("Error al guardar el objetivo:", error);
    throw error; // Lanza el error para que sea capturado en el controlador
  }

};

// Actualizar un objetivo
export const updateObjetivo = async (
  id,
  nombre,
  descripcion,
  fechaFinalizacion,
  prioridad,
  categoria,
  completado,
  subObjetivos,
  rememberDays
) => {
  return await Objetivo.findByIdAndUpdate(
    id,
    {
      nombre,
      descripcion,
      fechaFinalizacion,
      prioridad,
      categoria,
      completado,
      subObjetivos,
      rememberDays,
    }, // Incluimos los nuevos campos en la actualización
    { new: true }
  );
};

// Eliminar un objetivo
export const deleteObjetivo = async (id) => {
  return await Objetivo.findByIdAndDelete(id);
};
