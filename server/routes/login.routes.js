import { Router } from 'express';
import {
    accessUser,

} from '../controllers/login.controller.js';

const router = Router();

router.post('/', accessUser);



export default router;