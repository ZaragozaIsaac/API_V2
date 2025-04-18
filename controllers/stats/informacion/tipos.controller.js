import { connectDB } from '../../../utils/sql.js';

export const obtenerTiposCuenta = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT
          tc.nombreTipoCuenta,
          COUNT(u.idUsuario) AS total
      FROM Usuarios u
      JOIN TipoCuenta tc ON u.idTipoCuenta = tc.idTipoCuenta
      GROUP BY tc.nombreTipoCuenta;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener tipos de cuenta:", error);
    res.status(500).json({ error: 'Error al obtener tipos de cuenta' });
  }
};
