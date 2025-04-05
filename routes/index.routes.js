import { Router } from 'express';
import { raiz, ping } from '../controllers/index.controllers.js';

const router = Router();

router.get('/', raiz);
router.get('/ping', ping);

export default router;
