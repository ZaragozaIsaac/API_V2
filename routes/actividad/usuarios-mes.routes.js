// routes/actividad/usuarios-mes.routes.js
import { Router } from 'express';
import { obtenerUsuariosPorMes } from '../../controllers/stats/actividad/usuariosPorMes.controller.js';

const router = Router();

// GET /dashboard/actividad/usuarios-mes
router.get('/', obtenerUsuariosPorMes);

export default router;
