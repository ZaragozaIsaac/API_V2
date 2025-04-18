// controllers/stats/actividad/usuariosPorMes.controller.js
import { connectDB } from '../../../utils/sql.js';

export const obtenerUsuariosPorMes = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT
          TO_CHAR(fechaRegistro, 'YYYY-MM') AS mes_registro,
          COUNT(*) AS total_usuarios
      FROM Usuarios
      GROUP BY TO_CHAR(fechaRegistro, 'YYYY-MM')
      ORDER BY mes_registro DESC;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios por mes:", error);
    res.status(500).json({ error: 'Error al obtener usuarios por mes' });
  }
};
