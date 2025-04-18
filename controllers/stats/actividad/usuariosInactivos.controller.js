// controllers/stats/actividad/usuariosInactivos.controller.js
import { connectDB } from '../../../utils/sql.js';

export const obtenerUsuariosInactivos = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
    SELECT
    u.idUsuario,
    u.nombreUsuario,
    u.correoUsuario
    FROM Usuarios u
    WHERE u.idTipoCuenta = 1
    AND u.idUsuario NOT IN (
      SELECT DISTINCT p.idUsuario
      FROM Partidas p
      WHERE p.inicioPartida >= NOW() - INTERVAL '7 days');
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios inactivos:", error);
    res.status(500).json({ error: 'Error al obtener usuarios inactivos' });
  }
};
