import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema({
  primerNombre: { type: String, required: true },
    segundoNombre: { type: String },
    primerApellido: { type: String, required: true },
    segundoApellido: { type: String },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    sexo: { type: String, required: true },
 
});



// Middleware para hashear la contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (this.isModified('contraseña') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.contraseña = await bcrypt.hash(this.contraseña, salt);
  }
  next();
});

// Modelo de Usuario
export const Usuario = mongoose.model("Usuario", usuarioSchema);

// Obtener todos los usuarios
export const getUsuarios = async () => {
  return await Usuario.find();
};

// Obtener un usuario por su ID
export const getUsuarioById = async (id) => {
  try {
    return await Usuario.findById(id);
  } catch (error) {
    return null;
  }
};

// Obtener un usuario por su correo
export const getUsuarioByCorreo = async (correo) => {
  try {
    return await Usuario.findOne({ correo });
  } catch (error) {
    return null;
  }
};

// Crear un nuevo usuario
export const createUsuario = async (primerNombre, segundoNombre, primerApellido, segundoApellido, correo, contraseña, fechaNacimiento, sexo) => {
  const nuevoUsuario = new Usuario({
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    correo,
    contraseña,  // Será hasheada automáticamente por el middleware pre-save
    fechaNacimiento,
    sexo
  });

  return await nuevoUsuario.save();
};

// Actualizar un usuario
export const updateUsuario = async (id, primerNombre, segundoNombre, primerApellido, segundoApellido, correo, contraseña, fechaNacimiento, sexo) => {
  const updateFields = {
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      correo,
      fechaNacimiento,
      sexo
  };

  // Si se envía una nueva contraseña, la hasheamos
  if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      updateFields.contraseña = await bcrypt.hash(contraseña, salt);
  }

  return await Usuario.findByIdAndUpdate(id, updateFields, { new: true });
};

// Eliminar un usuario
export const deleteUsuario = async (id) => {
  return await Usuario.findByIdAndDelete(id);
};
