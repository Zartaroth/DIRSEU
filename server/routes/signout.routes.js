// Contiene las rutas de la API.

import { Router } from 'express';
import {
    signOut,

} from '../controllers/signout.controller.js';

const router = Router();

router.delete('/', signOut);


export default router;