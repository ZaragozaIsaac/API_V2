import { Router } from 'express';
import { registrarUsuario } from '../controllers/auth/register.controllers.js';
import { iniciarSesion } from '../controllers/auth/login.controllers.js';
import { cerrarSesion } from '../controllers/auth/logout.controllers.js';

const router = Router();

router.post('/register', registrarUsuario);
router.post('/login', iniciarSesion);
router.put('/logout', cerrarSesion);

export default router;

