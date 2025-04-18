// routes/IndicadoresNivel/tiempo-nivel.routes.js
import { Router } from 'express';
import { obtenerTiempoPromedioPorNivel } from '../../controllers/stats/IndicadoresNivel/tiempoNivel.controller.js';

const router = Router();

// GET /dashboard/niveles/tiempo
router.get('/', obtenerTiempoPromedioPorNivel);

export default router;