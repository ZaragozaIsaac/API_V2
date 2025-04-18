// routes/monitoreo/promedio-nivel.routes.js
import { Router } from 'express';
import { obtenerPromedioPorNivel } from '../../controllers/stats/monitoreo/promedioNivel.controller.js';

const router = Router();

// GET /dashboard/monitoreo/promedio-nivel
router.get('/', obtenerPromedioPorNivel);

export default router;
