import { connectDB } from '../../utils/sql.js';

export const obtenerTop10Jugadores = async (req, res) => {
  try {
    const pool = connectDB();

    const query = {
      text: `
        SELECT
          CAST(ROW_NUMBER() OVER (ORDER BY puntostotales DESC) AS INT) AS posicion,
          CONCAT(nombreUsuario, ' ', LEFT(primerApellidoUsuario, 1), '.') AS nombre,
          puntostotales
        FROM Usuarios
        WHERE idTipoCuenta = 1
        ORDER BY puntostotales DESC
        LIMIT 10
      `
    };

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener el Top 10:", error);
    res.status(500).json({ error: 'No se pudo obtener el ranking' });
  }
};
