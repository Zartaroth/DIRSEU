import { Router } from 'express';
import {
    createStudent,
    createEgresado,
    createDocente,
    createEmpleador,
     // Asegúrate de que esta función exista si tienes una ruta genérica de "signup"
} from '../controllers/signup.controller.js';

const router = Router();

router.post('/student', createStudent);
router.post('/egresado', createEgresado);
router.post('/docente', createDocente);
router.post('/empleador', createEmpleador);

export default router;
