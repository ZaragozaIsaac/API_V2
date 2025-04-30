// controllers/stats/monitoreo/partidasSemana.controller.js
import { connectDB } from '../../../utils/sql.js';

export const obtenerTopPartidasSemana = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT
        u.idUsuario,
        u.nombreUsuario,
        COUNT(p.idPartida) AS total_partidas
      FROM Usuarios u
      JOIN Partidas p ON u.idUsuario = p.idUsuario
      WHERE u.idTipoCuenta = 1
        AND p.inicioPartida >= date_trunc('week', CURRENT_DATE)
        AND p.inicioPartida <= NOW()
      GROUP BY u.idUsuario, u.nombreUsuario
      ORDER BY total_partidas DESC
      LIMIT 10;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener top partidas semana:", error);
    res.status(500).json({ error: 'Error al obtener top partidas semana' });
  }
};
