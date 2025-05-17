import express from 'express';
import {
    createFormacionAcademica,
    getFormacionesByEgresado,
    getAllFormaciones,
    getFormacionById,
    updateFormacionAcademica,
    deleteFormacionAcademica
} from '../controllers/formacionAcademicaController.js';

const router = express.Router();

// Ruta para crear una nueva formación académica
router.post('/', createFormacionAcademica);

// Ruta para obtener todas las formaciones académicas de un egresado
router.get('/egresado/:id_egresado', getFormacionesByEgresado);

// Ruta para obtener todas las formaciones académicas
router.get('/', getAllFormaciones);

// Ruta para obtener una formación académica específica por ID
router.get('/:id', getFormacionById);

// Ruta para actualizar una formación académica
router.put('/:id', updateFormacionAcademica);

// Ruta para eliminar una formación académica
router.delete('/:id', deleteFormacionAcademica);

export default router;
