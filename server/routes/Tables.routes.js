import { Router } from 'express';
import {
    getTables,
    getUsersByInscription,
    getEgresadosByInscription,
    getModule,
    registerIncription,
    registerIncriptionEgresados,
    getTallerUsersController,
} from '../controllers/Tables.controller.js';

const router = Router();

router.post('/get-table', getTables);
router.post('/get-module', getModule);
router.post('/users-inscription', getUsersByInscription);
router.post('/egresados-inscription', getEgresadosByInscription);
router.post('/register-inscription', registerIncription);
router.post('/register-inscripcionEgresados', registerIncriptionEgresados);
router.get('/talleres/:tallerId/inscritos', getTallerUsersController);

export default router;