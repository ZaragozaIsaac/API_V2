import { connectDB } from '../../../utils/sql.js';

export const obtenerPartidasSemana = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT
      TO_CHAR(inicioPartida, 'YYYY-MM-DD') AS fecha,
      COUNT(*) AS total_partidas
      FROM Partidas
      WHERE inicioPartida >= NOW() - INTERVAL '7 days'
      GROUP BY fecha
      ORDER BY fecha;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener partidas de la semana:", error);
    res.status(500).json({ error: 'Error al obtener partidas de la semana' });
  }
};
