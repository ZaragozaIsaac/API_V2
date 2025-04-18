// routes/informacion/sesiones.routes.js
import { Router } from 'express';
import { obtenerSesionesSemana } from '../../controllers/stats/informacion/sesiones.controller.js';

const router = Router();

// GET /dashboard/informacion/sesiones
router.get('/', obtenerSesionesSemana);

export default router;
