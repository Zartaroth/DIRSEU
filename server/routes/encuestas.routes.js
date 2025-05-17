import express from 'express';
import {
    getAllEncuestas,
    getEncuestaById,
    createEncuesta,
    obtenerEncuestasValidas,
    obtenerEncuestasPorFechaEspecifica,
    updateEncuesta,
    deleteEncuesta
} from '../controllers/encuestaController.js';

const router = express.Router();

router.get('/', getAllEncuestas);
router.get('/validas', obtenerEncuestasValidas);
router.get('/fecha/:fecha', obtenerEncuestasPorFechaEspecifica);
router.get('/:id', getEncuestaById);
router.post('/', createEncuesta);
router.put('/:id', updateEncuesta);
router.delete('/:id', deleteEncuesta);

export default router;
