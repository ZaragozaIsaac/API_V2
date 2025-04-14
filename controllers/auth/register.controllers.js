import { connectDB } from '../../utils/sql.js';

export const registrarUsuario = async (req, res) => {
  try {
    const pool = connectDB();

    const {
      nombre,
      apellido1,
      apellido2,
      correo,
      contrasena,
    } = req.body;

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
