import express from 'express';
import { createEmpleoActual,
         getAllEmpleosActuales,
         getEmpleoByEgresado,
         getEmpleoById,
         updateEmpleoActual,
         deleteEmpleoActual
} from '../controllers/trabajoActualController.js';

const router = express.Router();

// Ruta para obtener todas las experiencias laborales
router.get('/', getAllEmpleosActuales);

// Ruta para obtener todas los empleos de un egresado específico
router.get('/egresado/:id_egresado', getEmpleoByEgresado);

// Ruta para obtener una experiencia laboral específica por ID
router.get('/:id', getEmpleoById);

// Ruta para crear una nueva experiencia laboral
router.post('/', createEmpleoActual);

// Ruta para actualizar una experiencia laboral
router.put('/:id', updateEmpleoActual);

// Ruta para eliminar una experiencia laboral
router.delete('/:id', deleteEmpleoActual);

export default router;