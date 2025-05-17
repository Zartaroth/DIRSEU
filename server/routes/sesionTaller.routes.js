import express from 'express';
import {
    getAllSesionesByTallerId,
    getSesionById,
    createSesionTaller,
    updateSesionTaller,
    deleteSesionTaller
} from '../controllers/sesionTallerController.js';

const router = express.Router();

// Ruta para obtener todas las sesiones de un taller
router.get('/taller/:tallerId', getAllSesionesByTallerId);

// Ruta para obtener una sesión específica por ID
router.get('/:id', getSesionById);

// Ruta para crear una nueva sesión de taller
router.post('/', createSesionTaller);

// Ruta para actualizar una sesión existente
router.put('/:id', updateSesionTaller);

// Ruta para eliminar una sesión
router.delete('/:id', deleteSesionTaller);

export default router;
