import { connectDB } from '../../utils/sql.js';

export const iniciarSesion = async (req, res) => {
  try {
    const pool = connectDB();
    const { correo, contrasena } = req.body;

    const query = {
      text: 'SELECT iniciar_sesion($1, $2) AS resultado',
      values: [correo, contrasena],
    };

    const result = await pool.query(query);
    const mensaje = result.rows[0].resultado;

    if (mensaje === 'Bienvenido Empleado' || mensaje === 'Bienvenido Administrador') {
      const userQuery = {
        text: `
          SELECT u.idUsuario, u.nombreUsuario, tc.nombreTipoCuenta 
          FROM Usuarios u 
          JOIN TipoCuenta tc ON u.idTipoCuenta = tc.idTipoCuenta 
          WHERE u.correoUsuario = $1
        `,
        values: [correo]
      };

      const userResult = await pool.query(userQuery);
      const usuario = userResult.rows[0];

      const sesionQuery = {
        text: 'INSERT INTO Sesiones (idUsuario) VALUES ($1)',
        values: [usuario.idusuario]
      };

      await pool.query(sesionQuery);

      return res.json({
        message: mensaje,
        nombre: usuario.nombreusuario,
        idUsuario: usuario.idusuario,
        tipoCuenta: usuario.nombretipocuenta
      });
    }

    res.status(401).json({ message: mensaje });

  } catch (error) {
    console.error("Error en iniciarSesion:", error);
    res.status(500).json({ error: error.message });
  }
};
