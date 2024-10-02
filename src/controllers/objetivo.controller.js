import {
  getObjetivos,
  getObjetivoById,
  createObjetivo,
  updateObjetivo,
  deleteObjetivo,
} from "../models/objetivo.model.js";

// Obtener todos los objetivos
export const getAllObjetivos = async (req, res) => {
  try {
    const objetivos = await getObjetivos();
    res.status(200).json({
      success: true,
      message: "Lista de todos los objetivos",
      data: objetivos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo objetivos",
      error: error.message,
    });
  }
};

// Obtener un objetivo por ID
export const getObjetivoController = async (req, res) => {
  const { id } = req.params;
  try {
    const objetivo = await getObjetivoById(id);
    if (!objetivo) {
      return res.status(404).json({
        success: false,
        message: "Objetivo no encontrado",
      });
    }
    res.status(200).json({
      success: true,
      data: objetivo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error obteniendo el objetivo",
      error: error.message,
    });
  }
};

// Crear un nuevo objetivo
export const postObjetivoController = async (req, res) => {
  const {
    nombre,
    descripcion,
    fechaFinalizacion,
    prioridad,
    categoria,
    subObjetivos,
    rememberDays  
  } = req.body;
  
  const usuarioId = req.user.id; // Obtenido del middleware de autenticación
  try {
    const nuevoObjetivo = await createObjetivo(
      nombre,
      descripcion,
      usuarioId,
      fechaFinalizacion,
      prioridad,
      categoria,
      subObjetivos,
      rememberDays  
    );
    
    res.status(201).json({
      success: true,
      message: "Objetivo creado con éxito",
      data: nuevoObjetivo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creando objetivo",
      error: error.message,
    });
  }
};

// Actualizar un objetivo por ID
export const putObjetivoController = async (req, res) => {
  console.log("llegue al modificar")
  const { id } = req.params;
  const {
    nombre,
    descripcion,
    fechaFinalizacion,
    prioridad,
    categoria,
    completado,
    subObjetivos,
    rememberDays  
  } = req.body;
  const usuarioId = req.user.id;
  console.log("ID recibido:", id);
  console.log("Datos del objetivo recibidos:", req.body);
  try {
    const objetivoActualizado = await updateObjetivo(
      id,
      nombre,
      descripcion,
      fechaFinalizacion,
      prioridad,
      categoria,
      completado,
      subObjetivos,
      rememberDays  
    );
    if (!objetivoActualizado) {
      return res.status(404).json({
        success: false,
        message: "Objetivo no encontrado",
      });
    }
    res.status(200).json({
      success: true,
      message: "Objetivo actualizado con éxito",
      data: objetivoActualizado,
    });
  } catch (error) {
    console.error("Error actualizando el objetivo:", error.message);
    res.status(500).json({
      success: false,
      message: "Error actualizando el objetivo",
      error: error.message,
    });
  }
};

// Eliminar un objetivo por ID
export const deleteObjetivoController = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.user.id;
  try {
    const objetivoEliminado = await deleteObjetivo(id);
    if (!objetivoEliminado) {
      return res.status(404).json({
        success: false,
        message: "Objetivo no encontrado",
      });
    }
    res.status(200).json({
      success: true,
      message: "Objetivo eliminado con éxito",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error eliminando el objetivo",
      error: error.message,
    });
  }
};

export default {
  getAllObjetivos,
  getObjetivoController,
  postObjetivoController,
  putObjetivoController,
  deleteObjetivoController,
};
