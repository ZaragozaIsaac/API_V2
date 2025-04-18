// routes/monitoreo/partidas.routes.js
import { Router } from 'express';
import { obtenerTopPartidasSemana } from '../../controllers/stats/monitoreo/partidasSemana.controller.js';

const router = Router();

// GET /dashboard/monitoreo/partidas
router.get('/', obtenerTopPartidasSemana);

export default router;
