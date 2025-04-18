// routes/monitoreo/puntaje.routes.js
import { Router } from 'express';
import { obtenerTopPuntajeSemanal } from '../../controllers/stats/monitoreo/puntajeSemanal.controller.js';

const router = Router();

// GET /dashboard/monitoreo/puntaje
router.get('/', obtenerTopPuntajeSemanal);

export default router;