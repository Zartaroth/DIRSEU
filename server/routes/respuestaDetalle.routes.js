import express from 'express';
import {
    getAllRespuestaDetalles,
    getRespuestaDetalleById,
    createRespuestaDetalle,
    deleteRespuestaDetalle
} from '../controllers/respuestaDetalleController.js';

const router = express.Router();

// Ruta para obtener todos los detalles de una respuesta
router.get('/:respuesta_id', getAllRespuestaDetalles);

// Ruta para obtener un detalle específico por ID
router.get('/:id', getRespuestaDetalleById);

// Ruta para crear un nuevo detalle de respuesta
router.post('/', createRespuestaDetalle);

// Ruta para eliminar un detalle de respuesta
router.delete('/:id', deleteRespuestaDetalle);

export default router;
