// controllers/stats/monitoreo/puntajeSemanal.controller.js
import { connectDB } from '../../../utils/sql.js';

export const obtenerTopPuntajeSemanal = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT
        u.idUsuario,
        u.nombreUsuario,
        SUM(p.puntosObtenidos) AS puntos_ultimos_7_dias
      FROM Usuarios u
      JOIN Partidas p ON u.idUsuario = p.idUsuario
      WHERE u.idTipoCuenta = 1
        AND p.inicioPartida >= date_trunc('week', CURRENT_DATE)
        AND p.inicioPartida <= NOW()
      GROUP BY u.idUsuario, u.nombreUsuario
      ORDER BY puntos_ultimos_7_dias ASC
      LIMIT 10;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener puntajes semanales:", error);
    res.status(500).json({ error: 'Error al obtener puntajes semanales' });
  }
};
