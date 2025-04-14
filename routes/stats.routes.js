import { Router } from 'express';
import { obtenerTop10Jugadores } from '../controllers/stats/top10.controllers.js';
import { obtenerPosicionUsuario } from '../controllers/stats/posicion.controllers.js';

// (más adelante importaremos el otro controlador aquí también)

const router = Router();

router.get('/top10', obtenerTop10Jugadores);
router.get('/posicion/:idUsuario', obtenerPosicionUsuario);

export default router;
