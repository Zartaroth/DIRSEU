import express from 'express';
import { createIdioma, getIdiomasByEgresado, getAllIdiomas, getIdiomaById, updateIdioma, deleteIdioma } from '../controllers/idiomasController.js';

const router = express.Router();

// Ruta para crear un nuevo idioma
router.post('/', createIdioma);

// Ruta para obtener todos los idiomas de un egresado
router.get('/egresado/:id_egresado', getIdiomasByEgresado);

// Ruta para obtener todos los idiomas
router.get('/', getAllIdiomas);

// Ruta para obtener un idioma específico por ID
router.get('/:id', getIdiomaById);

// Ruta para actualizar un idioma
router.put('/:id', updateIdioma);

// Ruta para eliminar un idioma
router.delete('/:id', deleteIdioma);

export default router;
