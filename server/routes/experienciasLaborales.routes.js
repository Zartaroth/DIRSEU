import express from 'express';
import {
  createExperienciaLaboral,
  getExperienciasByEgresado,
  getExperienciaById,
  updateExperienciaLaboral,
  deleteExperienciaLaboral,
  getAllExperiencias,
} from '../controllers/experienciasLaboralesController.js';

const router = express.Router();

// Ruta para obtener todas las experiencias laborales
router.get('/', getAllExperiencias);

// Ruta para obtener todas las experiencias laborales de un egresado específico
router.get('/egresado/:id_egresado', getExperienciasByEgresado);

// Ruta para obtener una experiencia laboral específica por ID
router.get('/:id', getExperienciaById);

// Ruta para crear una nueva experiencia laboral
router.post('/', createExperienciaLaboral);

// Ruta para actualizar una experiencia laboral
router.put('/:id', updateExperienciaLaboral);

// Ruta para eliminar una experiencia laboral
router.delete('/:id', deleteExperienciaLaboral);

export default router;
