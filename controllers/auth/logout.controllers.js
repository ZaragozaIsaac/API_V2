import { connectDB } from '../../utils/sql.js';

export const cerrarSesion = async (req, res) => {
  try {
    const pool = connectDB();
    const idUsuario = parseInt(req.body.idUsuario, 10);

    if (isNaN(idUsuario)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }

    const query = {
      text: `
        UPDATE Sesiones
        SET fechaFin = CURRENT_TIMESTAMP
        WHERE idUsuario = $1 AND fechaFin IS NULL
      `,
      values: [idUsuario]
    };

    await pool.query(query);
    res.json({ message: 'Sesión cerrada correctamente' });

  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(500).json({ error: 'No se pudo cerrar la sesión' });
  }
};
