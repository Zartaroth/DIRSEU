import express from 'express';
import {
    createBachillerato,
    getAllBachilleratos,
    getBachilleratoByEgresado,
    getBachilleratoById,
    updateBachillerato,
    deleteBachillerato
} from '../controllers/bachilleratoController.js';

const router = express.Router();

// Ruta para obtener todas las experiencias laborales
router.get('/', getAllBachilleratos);

// Ruta para obtener todas las experiencias laborales de un egresado específico
router.get('/egresado/:id_egresado', getBachilleratoByEgresado);

// Ruta para obtener una experiencia laboral específica por ID
router.get('/:id', getBachilleratoById);

// Ruta para crear una nueva experiencia laboral
router.post('/', createBachillerato);

// Ruta para actualizar una experiencia laboral
router.put('/:id', updateBachillerato);

// Ruta para eliminar una experiencia laboral
router.delete('/:id', deleteBachillerato);

export default router;