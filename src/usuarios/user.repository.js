import { getConnection } from '../../db.js';
import sql from 'mssql';

// Obtener la lista de monitores de la BD
export const findMonitores = async () => {
  const pool = await getConnection();
  const result = await pool.request().query(`
    SELECT U.UsuarioID, E.NombreCompleto
    FROM Usuarios U
    INNER JOIN Estudiantes E ON U.UsuarioID = E.Matricula
    WHERE U.IdRol = 2
    ORDER BY E.NombreCompleto ASC;
  `);
  return result.recordset;
};

// Buscar rol actual de un usuario
export const getRolById = async (usuarioID) => {
  const pool = await getConnection();
  const res = await pool.request()
    .input('UsuarioID', sql.VarChar(10), usuarioID)
    .query('SELECT IdRol FROM Usuarios WHERE UsuarioID = @UsuarioID');
  return res.recordset[0];
};

// Actualizar el rol en la tabla Usuarios
export const updateUsuarioRol = async (usuarioID, nuevoRol) => {
  const pool = await getConnection();
  const result = await pool.request()
    .input('UsuarioID', sql.VarChar(10), usuarioID)
    .input('NuevoRol', sql.Int, nuevoRol)
    .query('UPDATE Usuarios SET IdRol = @NuevoRol WHERE UsuarioID = @UsuarioID');
  return result.rowsAffected[0];
};

// Limpiar datos de monitor en la tabla Estudiantes
export const clearMonitorFields = async (usuarioID) => {
  const pool = await getConnection();
  await pool.request()
    .input('UsuarioID', sql.VarChar(10), usuarioID)
    .query('UPDATE Estudiantes SET IdPasillo = NULL, IdDormitorio = NULL WHERE Matricula = @UsuarioID');
};