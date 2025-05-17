import express from 'express';
import {
    getAllPreguntasByEncuestaId,
    getPreguntaById,
    createPregunta,
    updatePregunta,
    deletePregunta
} from '../controllers/preguntaController.js';

const router = express.Router();

// Ruta para obtener todas las preguntas de una encuesta
router.get('/encuesta/:encuestaId', getAllPreguntasByEncuestaId);

// Ruta para obtener una pregunta específica por ID
router.get('/:id', getPreguntaById);

// Ruta para crear una nueva pregunta
router.post('/', createPregunta);

// Ruta para actualizar una pregunta existente
router.put('/:id', updatePregunta);

// Ruta para eliminar una pregunta
router.delete('/:id', deletePregunta);

export default router;
