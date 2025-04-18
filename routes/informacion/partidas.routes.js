// routes/informacion/partidas.routes.js
import { Router } from 'express';
import { obtenerPartidasSemana } from '../../controllers/stats/informacion/partidas.controller.js';

const router = Router();

// GET /dashboard/informacion/partidas
router.get('/', obtenerPartidasSemana);

export default router;
