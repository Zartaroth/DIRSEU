import express from 'express';
import { createLogro, getLogrosByEgresado, getAllLogros, getLogroById, updateLogro, deleteLogro } from '../controllers/logros.Controller.js';

const router = express.Router();

// Crear un nuevo logro
router.post('/', createLogro);

// Obtener todos los logros de un egresado
router.get('/egresado/:id_egresado', getLogrosByEgresado);

// Obtener todos los logros
router.get('/', getAllLogros);

// Obtener un logro específico por ID
router.get('/:id', getLogroById);

// Actualizar un logro
router.put('/:id', updateLogro);

// Eliminar un logro
router.delete('/:id', deleteLogro);

export default router;
