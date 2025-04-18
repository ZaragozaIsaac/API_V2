// controllers/stats/IndicadoresNivel/partidasNivel.controller.js
import { connectDB } from '../../../utils/sql.js';

export const obtenerPartidasPorNivel = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT
        n.nombreNivel,
        COUNT(p.idPartida) AS cantidad_partidas
      FROM Partidas p
      JOIN Niveles n ON p.idNivel = n.idNivel
      GROUP BY n.nombreNivel
      ORDER BY cantidad_partidas DESC;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener partidas por nivel:", error);
    res.status(500).json({ error: 'Error al obtener partidas por nivel' });
  }
};
