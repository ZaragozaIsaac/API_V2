// controllers/stats/actividad/ultimasSesiones.controller.js
import { connectDB } from '../../../utils/sql.js';

export const obtenerUltimasSesiones = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT
        TRIM(TO_CHAR(s.fechaInicio, 'Day')) AS dia_semana,
        COUNT(*) AS cantidad_sesiones
      FROM Sesiones s
      WHERE s.fechaInicio >= date_trunc('week', CURRENT_DATE)
        AND s.fechaInicio <= NOW()
      GROUP BY dia_semana
      ORDER BY MIN(s.fechaInicio);
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener últimas sesiones:", error);
    res.status(500).json({ error: 'Error al obtener últimas sesiones' });
  }
};
