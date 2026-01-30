import * as UserService from './user.service.js';

export const getMonitores = async (req, res) => {
  try {
    const data = await UserService.obtenerMonitores();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateRol = async (req, res) => {
  try {
    const { usuarioID } = req.params;
    const { nuevoRol } = req.body;
    const result = await UserService.procesarCambioRol(usuarioID, nuevoRol);
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};