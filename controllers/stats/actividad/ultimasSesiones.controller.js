// controllers/stats/actividad/ultimasSesiones.controller.js
import { connectDB } from '../../../utils/sql.js';

export const obtenerUltimasSesiones = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT
          u.idUsuario,
          u.nombreUsuario,
          u.correoUsuario,
          s.fechaInicio AS ultima_sesion
      FROM Usuarios u
      JOIN Sesiones s ON u.idUsuario = s.idUsuario
      ORDER BY s.fechaInicio DESC
      LIMIT 10;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener últimas sesiones:", error);
    res.status(500).json({ error: 'Error al obtener últimas sesiones' });
  }
};
