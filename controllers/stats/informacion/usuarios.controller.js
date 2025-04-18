import { connectDB } from '../../../utils/sql.js';

export const obtenerTotalUsuarios = async (req, res) => {
  try {
    const pool = connectDB();
    const result = await pool.query(`
      SELECT COUNT(*) AS total_usuarios
      FROM Usuarios;
    `);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener total de usuarios:", error);
    res.status(500).json({ error: 'Error al obtener total de usuarios' });
  }
};
