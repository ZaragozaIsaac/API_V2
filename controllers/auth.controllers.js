import { connectDB } from '../utils/sql.js';

/**
 * Controlador para invocar al stored procedure "registrar_usuario"
 * que crea un nuevo usuario del tipo "Empleado".
 */
export const registrarUsuario = async (req, res) => {
  try {
    const pool = connectDB();

    // Extraemos campos de la petición
    const {
      nombre,
      apellido1,
      apellido2,
      correo,
      contrasena,
    } = req.body;

    // Llamamos a la función "registrar_usuario"
    // Revisa cómo la definiste:
    // SELECT registrar_usuario(_nombre, _apellido1, _apellido2, _correo, _contrasena)
    const query = {
      text: 'SELECT registrar_usuario($1, $2, $3, $4, $5)',
      values: [nombre, apellido1, apellido2, correo, contrasena],
    };

    await pool.query(query);
    res.json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controlador para invocar al stored procedure "iniciar_sesion"
 * que retorna un texto con el tipo de cuenta o 'Credenciales Incorrectas'.
 */
export const iniciarSesion = async (req, res) => {
  try {
    const pool = connectDB();
    const { correo, contrasena } = req.body;

    // 1. Verificamos las credenciales mediante la función iniciar_sesion
    const query = {
      text: 'SELECT iniciar_sesion($1, $2) AS resultado',
      values: [correo, contrasena],
    };

    const result = await pool.query(query);
    const mensaje = result.rows[0].resultado;

    if (mensaje === 'Bienvenido Empleado' || mensaje === 'Bienvenido Administrador') {
      // 2. Obtenemos idUsuario, nombreUsuario y tipoCuenta
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

      // 3. Registramos el inicio de sesión en la tabla Sesiones
      const sesionQuery = {
        text: 'SELECT registrar_inicio_sesion($1) AS idsession',
        values: [usuario.idusuario]
      };

      const sesionResult = await pool.query(sesionQuery);
      const idSession = sesionResult.rows[0].idsession;

      // 4. Respondemos con toda la información necesaria
      return res.json({
        message: mensaje,
        nombre: usuario.nombreusuario,
        idUsuario: usuario.idusuario,
        tipoCuenta: usuario.nombretipocuenta,
        idSession: idSession
      });
    }

    // Si las credenciales son incorrectas o la cuenta está inactiva
    res.status(401).json({ message: mensaje });

  } catch (error) {
    console.error("Error en iniciarSesion:", error);
    res.status(500).json({ error: error.message });
  }
};


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



