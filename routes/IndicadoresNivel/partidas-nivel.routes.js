// routes/IndicadoresNivel/partidas-nivel.routes.js
import { Router } from 'express';
import { obtenerPartidasPorNivel } from '../../controllers/stats/IndicadoresNivel/partidasNivel.controller.js';

const router = Router();

// GET /dashboard/niveles/partidas
router.get('/', obtenerPartidasPorNivel);

export default router;
