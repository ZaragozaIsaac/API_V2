// controllers/stats/actividad/ultimasPartidas.controller.js
import { connectDB } from '../../../utils/sql.js';

export const obtenerUltimasPartidas = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT
          u.idUsuario,
          u.nombreUsuario,
          p.inicioPartida AS fecha_partida,
          p.puntosObtenidos
      FROM Partidas p
      JOIN Usuarios u ON p.idUsuario = u.idUsuario
      ORDER BY p.inicioPartida DESC
      LIMIT 10;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener últimas partidas:", error);
    res.status(500).json({ error: 'Error al obtener últimas partidas' });
  }
};
