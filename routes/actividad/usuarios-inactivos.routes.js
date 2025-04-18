// routes/actividad/usuarios-inactivos.routes.js
import { Router } from 'express';
import { obtenerUsuariosInactivos } from '../../controllers/stats/actividad/usuariosInactivos.controller.js';

const router = Router();

// GET /dashboard/actividad/usuarios-inactivos
router.get('/', obtenerUsuariosInactivos);

export default router;
