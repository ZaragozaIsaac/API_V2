import { Router } from 'express';
import { obtenerPerfilUsuario } from '../controllers/profile/profile.controllers.js';

const router = Router();
router.get('/usuario/:idUsuario', obtenerPerfilUsuario);

export default router;
