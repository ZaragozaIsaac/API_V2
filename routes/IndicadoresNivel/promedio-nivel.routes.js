// routes/IndicadoresNivel/promedioNivel.routes.js
import { Router } from 'express';
import { obtenerPromedioPuntosPorNivel } from '../../controllers/stats/IndicadoresNivel/promedioNivel.controller.js';

const router = Router();

router.get('/', obtenerPromedioPuntosPorNivel);

export default router;
