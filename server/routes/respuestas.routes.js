import express from 'express';
import {
    createRespuesta,
    getRespuestasByEncuesta,
    getRespuestasByPregunta,
    getRespuestaById,
    updateRespuesta,
    deleteRespuesta,
} from '../controllers/respuestaController.js';

const router = express.Router();

router.post('/', createRespuesta); // Crear respuesta
router.get('/encuesta/:encuesta_id', getRespuestasByEncuesta); // Obtener respuestas por encuesta
router.get('/respuestas/pregunta/:pregunta_id', getRespuestasByPregunta);
router.get('/:id_respuesta', getRespuestaById); // Obtener respuesta por ID
router.put('/:id_respuesta', updateRespuesta); // Actualizar respuesta
router.delete('/:id_respuesta', deleteRespuesta); // Eliminar respuesta

export default router;
