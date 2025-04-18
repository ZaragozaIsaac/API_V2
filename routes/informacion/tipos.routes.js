// routes/informacion/tipos.routes.js
import { Router } from 'express';
import { obtenerTiposCuenta } from '../../controllers/stats/informacion/tipos.controller.js';

const router = Router();

// GET /dashboard/informacion/tipos
router.get('/', obtenerTiposCuenta);

export default router;

