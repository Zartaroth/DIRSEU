import express from 'express';
import {
  createPostulacion,
  getPostulacionesByOferta,
  getPostulacionesByEgresado,
  getAllPostulaciones,
  getPostulacionById,
  updatePostulacion,
  deletePostulacion,
} from '../controllers/postulacionesController.js';

const router = express.Router();

// Ruta para crear una nueva postulación
router.post('/', createPostulacion);

// Ruta para obtener todas las postulaciones de una oferta laboral
router.get('/oferta/:oferta_id', getPostulacionesByOferta);

// Ruta para obtener todas las postulaciones de un egresado
router.get('/egresado/:egresado_id', getPostulacionesByEgresado);

// Ruta para obtener todas las postulaciones
router.get('/', getAllPostulaciones);

// Ruta para obtener una postulación específica por ID
router.get('/:id', getPostulacionById);

// Ruta para actualizar una postulación
router.put('/:id', updatePostulacion);

// Ruta para eliminar una postulación
router.delete('/:id', deletePostulacion);

export default router;
