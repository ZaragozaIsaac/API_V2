// controllers/stats/actividad/ultimasPartidas.controller.js
import { connectDB } from '../../../utils/sql.js';

export const obtenerUltimasPartidas = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT
        TRIM(TO_CHAR(p.inicioPartida, 'Day')) AS dia_semana,
        COUNT(*) AS cantidad_partidas
      FROM Partidas p
      WHERE p.inicioPartida >= date_trunc('week', CURRENT_DATE)
        AND p.inicioPartida <= NOW()
      GROUP BY dia_semana
      ORDER BY MIN(p.inicioPartida);
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener últimas partidas:", error);
    res.status(500).json({ error: 'Error al obtener últimas partidas' });
  }
};
