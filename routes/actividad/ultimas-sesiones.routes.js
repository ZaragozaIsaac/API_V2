// routes/actividad/ultimas-sesiones.routes.js
import { Router } from 'express';
import { obtenerUltimasSesiones } from '../../controllers/stats/actividad/ultimasSesiones.controller.js';

const router = Router();

// GET /dashboard/actividad/ultimas-sesiones
router.get('/', obtenerUltimasSesiones);

export default router;
