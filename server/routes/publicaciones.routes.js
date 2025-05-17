import express from 'express';
import {
    getAllPublicaciones,
    getPublicacionById,
    createPublicacion,
    updatePublicacion,
    deletePublicacion
} from '../controllers/publicacionController.js';

const router = express.Router();

// Ruta para obtener todas las publicaciones
router.get('/', getAllPublicaciones);

// Ruta para obtener una publicación específica por ID
router.get('/:id', getPublicacionById);

// Ruta para crear una nueva publicación
router.post('/', createPublicacion);

// Ruta para actualizar una publicación existente
router.put('/:id', updatePublicacion);

// Ruta para eliminar una publicación
router.delete('/:id', deletePublicacion);

export default router;
