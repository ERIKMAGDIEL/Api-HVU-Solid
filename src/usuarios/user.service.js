import * as UserRepo from './user.repository.js';

export const obtenerMonitores = async () => {
  return await UserRepo.findMonitores();
};

export const procesarCambioRol = async (usuarioID, nuevoRol) => {
  // Validación de entrada
  if (!nuevoRol || (nuevoRol !== 2 && nuevoRol !== 3)) {
    throw { status: 400, message: 'El nuevoRol es requerido y debe ser 2 o 3.' };
  }

  // Verificación de existencia y rol actual
  const user = await UserRepo.getRolById(usuarioID);
  if (!user) throw { status: 404, message: 'El usuario especificado no existe.' };
  if (user.IdRol === nuevoRol) {
    const rolNombre = nuevoRol === 2 ? 'Monitor' : 'Estudiante';
    throw { status: 400, message: `El usuario ya tiene el rol de ${rolNombre}.` };
  }

  // Ejecución de la actualización
  const affected = await UserRepo.updateUsuarioRol(usuarioID, nuevoRol);

  if (affected > 0 && nuevoRol === 3) {
    // Lógica de limpieza específica de tu proyecto
    await UserRepo.clearMonitorFields(usuarioID);
    console.log(`[API Usuarios] Se limpiaron campos de monitor para: ${usuarioID}`);
  }

  return { success: true, message: 'Rol actualizado correctamente.' };
};