// routes/actividad/ultimas-partidas.routes.js
import { Router } from 'express';
import { obtenerUltimasPartidas } from '../../controllers/stats/actividad/ultimasPartidas.controller.js';

const router = Router();

// GET /dashboard/actividad/ultimas-partidas
router.get('/', obtenerUltimasPartidas);

export default router;
