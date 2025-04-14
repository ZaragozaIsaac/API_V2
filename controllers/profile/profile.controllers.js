import { connectDB } from '../../utils/sql.js';

export const obtenerPerfilUsuario = async (req, res) => {
  try {
    const pool = connectDB();
    const { idUsuario } = req.params;

    const query = {
      text: `
        SELECT 
          nombreUsuario,
          primerApellidoUsuario,
          segundoApellidoUsuario,
          correoUsuario,
          contrasenaUsuario,
          tc.nombreTipoCuenta AS tipoCuenta,
          estatusCuenta,
          fechaRegistro
        FROM Usuarios u
        JOIN TipoCuenta tc ON u.idTipoCuenta = tc.idTipoCuenta
        WHERE u.idUsuario = $1;
      `,
      values: [idUsuario]
    };

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
