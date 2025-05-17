import express from 'express';
import {
    getAllOpciones,
    getOpcionById,
    getOpcionesByPreguntaId,
    createOpcion,
    updateOpcion,
    deleteOpcion
} from '../controllers/opcionController.js';

const router = express.Router();

// router.get('/', getAllOpciones);
router.get('/:id', getOpcionById);
router.get('/pregunta/:pregunta_id', getOpcionesByPreguntaId);
router.post('/', createOpcion);
router.put('/:id', updateOpcion);
router.delete('/:id', deleteOpcion);

export default router;
