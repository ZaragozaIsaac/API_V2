import { Router } from 'express';
import { registrarUsuario, iniciarSesion } from '../controllers/auth.controllers.js';
import { cerrarSesion } from '../controllers/auth.controllers.js';


const router = Router();

// POST /auth/register
router.post('/register', registrarUsuario);

// POST /auth/login
router.post('/login', iniciarSesion);

// PUT /logout
router.put('/logout', cerrarSesion);

export default router;
