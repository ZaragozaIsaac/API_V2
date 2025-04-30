// controllers/stats/IndicadoresNivel/promedioNivel.controller.js
import { connectDB } from '../../../utils/sql.js';

export const obtenerPromedioPuntosPorNivel = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT
        n.nombreNivel,
        ROUND(AVG(p.puntosObtenidos), 2) AS promedio_puntos
      FROM Partidas p
      JOIN Niveles n ON p.idNivel = n.idNivel
      JOIN Usuarios u ON p.idUsuario = u.idUsuario
      WHERE u.idTipoCuenta = 1
      GROUP BY n.nombreNivel
      ORDER BY promedio_puntos DESC;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener promedio por nivel:", error);
    res.status(500).json({ error: "Error al obtener promedio por nivel" });
  }
};
