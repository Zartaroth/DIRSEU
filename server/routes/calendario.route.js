import express from 'express';
import { crearCalendario, obtenerEventosCalendario, actualizarCalendario, eliminarCalendario } from '../controllers/calendarioController.js';

const router = express.Router();

router.post('/', crearCalendario);
router.get('/', obtenerEventosCalendario);
router.put('/:id', actualizarCalendario);
router.delete('/:id', eliminarCalendario);

export default router;