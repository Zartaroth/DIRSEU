import express from 'express';
import {
    createTituloProfesional,
    getAllTitulosProfesionales,
    getTituloByEgresado,
    getTituloById,
    updateTituloProfesional,
    deleteTituloProfesional
} from '../controllers/tituloProfesionalController.js';

const router = express.Router();

// Ruta para obtener todas las experiencias laborales
router.get('/', getAllTitulosProfesionales);

// Ruta para obtener todas las experiencias laborales de un egresado específico
router.get('/egresado/:id_egresado', getTituloByEgresado);

// Ruta para obtener una experiencia laboral específica por ID
router.get('/:id', getTituloById);

// Ruta para crear una nueva experiencia laboral
router.post('/', createTituloProfesional);

// Ruta para actualizar una experiencia laboral
router.put('/:id', updateTituloProfesional);

// Ruta para eliminar una experiencia laboral
router.delete('/:id', deleteTituloProfesional);

export default router;