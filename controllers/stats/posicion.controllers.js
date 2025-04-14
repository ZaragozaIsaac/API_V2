import { connectDB } from '../../utils/sql.js';

export const obtenerPosicionUsuario = async (req, res) => {
  try {
    const pool = connectDB();
    const { idUsuario } = req.params;

    const query = {
      text: `
        SELECT posicion, nombreusuario, puntostotales FROM (
          SELECT 
            idUsuario,
            nombreUsuario,
            puntostotales,
            ROW_NUMBER() OVER (ORDER BY puntostotales DESC) AS posicion
          FROM Usuarios
          WHERE idTipoCuenta = 1
        ) AS ranking
        WHERE idUsuario = $1;
      `,
      values: [idUsuario]
    };

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener la posición del usuario:", error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
