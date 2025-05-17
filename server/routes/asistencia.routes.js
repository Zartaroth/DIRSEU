import express from 'express';
import {
    createAsistencia,
    getAllAsistenciasByTallerId,
    getAsistenciaById,
    updateAsistenciaEstado,
    deleteAsistencia,
    getAsistenciasByFechaAndTaller,
    obtenerAsistenciasDetalladas,
} from '../controllers/asistenciaController.js';

const router = express.Router();

// Ruta para crear una nueva asistencia
router.post('/', createAsistencia);

// Ruta para obtener asistencias detalladas
router.get('/taller/:id_taller/sesion/:id_sesion', obtenerAsistenciasDetalladas);

// Ruta para obtener asistencias por fecha y taller
router.get('/taller/:id_taller/fecha/:fecha', getAsistenciasByFechaAndTaller);

// Ruta para obtener todas las asistencias de un taller
router.get('/taller/:id_taller', getAllAsistenciasByTallerId);

// Ruta para obtener una asistencia específica por ID
router.get('/:id', getAsistenciaById);

// Ruta para actualizar el estado de una asistencia
router.put('/:id', updateAsistenciaEstado);

// Ruta para eliminar una asistencia
router.delete('/:id', deleteAsistencia);

export default router;
