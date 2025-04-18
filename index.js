import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importamos rutas
import indexRoutes from './routes/index.routes.js';
import authRoutes from './routes/auth.routes.js';
import statsRoutes from './routes/stats.routes.js';
import profileRoutes from './routes/profile.routes.js';
import usuariosRoutes from './routes/informacion/usuarios.routes.js';
import tiposRoutes from './routes/informacion/tipos.routes.js';
import partidasRoutes from './routes/informacion/partidas.routes.js';
import sesionesRoutes from './routes/informacion/sesiones.routes.js';
import puntajeRoutes from './routes/monitoreo/puntaje.routes.js';
import maxpartidassemanaRoutes from './routes/monitoreo/partidas.routes.js';
import promedioNivelRoutes from './routes/monitoreo/promedio-nivel.routes.js';
import usuariosInactivosRoutes from './routes/actividad/usuarios-inactivos.routes.js';
import ultimasSesionesRoutes from './routes/actividad/ultimas-sesiones.routes.js';
import ultimasPartidasRoutes from './routes/actividad/ultimas-partidas.routes.js';
import usuariosMesRoutes from './routes/actividad/usuarios-mes.routes.js';
import tiempoNivelRoutes from './routes/IndicadoresNivel/tiempo-nivel.routes.js';
import partidasNivelRoutes from './routes/IndicadoresNivel/partidas-nivel.routes.js';

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
app.use('/dashboard/informacion/usuarios', usuariosRoutes);
app.use('/dashboard/informacion/tipos', tiposRoutes);
app.use('/dashboard/informacion/partidas', partidasRoutes);
app.use('/dashboard/informacion/sesiones', sesionesRoutes);
app.use('/dashboard/monitoreo/puntaje', puntajeRoutes);
app.use('/dashboard/monitoreo/partidas', maxpartidassemanaRoutes);
app.use('/dashboard/monitoreo/promedio-nivel', promedioNivelRoutes);
app.use('/dashboard/actividad/usuarios-inactivos', usuariosInactivosRoutes);
app.use('/dashboard/actividad/ultimas-sesiones', ultimasSesionesRoutes);
app.use('/dashboard/actividad/ultimas-partidas', ultimasPartidasRoutes);
app.use('/dashboard/actividad/usuarios-mes', usuariosMesRoutes);
app.use('/dashboard/niveles/tiempo', tiempoNivelRoutes);
app.use('/dashboard/niveles/partidas', partidasNivelRoutes);





// Escuchamos en el puerto configurado
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
