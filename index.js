import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import statsRoutes from './routes/stats.routes.js';
import profileRoutes from './routes/profile.routes.js';

// Importamos rutas
import indexRoutes from './routes/index.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

// Inicializamos la app
const app = express();

// Habilitamos CORS antes de definir rutas
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Registramos las rutas
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/estadisticas', statsRoutes);
app.use('/perfil', profileRoutes);

// Escuchamos en el puerto configurado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
