// controllers/stats/IndicadoresNivel/tiempoNivel.controller.js
import { connectDB } from '../../../utils/sql.js';

export const obtenerTiempoPromedioPorNivel = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT
        n.nombreNivel,
        ROUND(AVG(EXTRACT(EPOCH FROM (p.finPartida - p.inicioPartida)) / 60), 2) AS tiempo_promedio_minutos
      FROM Partidas p
      JOIN Niveles n ON p.idNivel = n.idNivel
      WHERE p.finPartida IS NOT NULL
      GROUP BY n.nombreNivel
      ORDER BY tiempo_promedio_minutos DESC;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener tiempo promedio por nivel:", error);
    res.status(500).json({ error: 'Error al obtener tiempo promedio por nivel' });
  }
};
