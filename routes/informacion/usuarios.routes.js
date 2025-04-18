// routes/informacion/usuarios.routes.js
import { Router } from 'express';
import { obtenerTotalUsuarios } from '../../controllers/stats/informacion/usuarios.controller.js';

const router = Router();

// GET /dashboard/informacion/usuarios
router.get('/', obtenerTotalUsuarios);

export default router;
