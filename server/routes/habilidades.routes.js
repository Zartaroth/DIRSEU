import express from 'express';
import {
    createHabilidad,
    getHabilidadesByEgresado,
    getAllHabilidades,
    getHabilidadById,
    updateHabilidad,
    deleteHabilidad
} from '../controllers/habilidadesController.js';

const router = express.Router();

// Rutas para habilidades
router.post('/', createHabilidad);
router.get('/egresado/:id_egresado', getHabilidadesByEgresado);
router.get('/', getAllHabilidades);
router.get('/:id', getHabilidadById);
router.put('/:id', updateHabilidad);
router.delete('/:id', deleteHabilidad);

export default router;
