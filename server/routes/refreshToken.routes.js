// END POINTS

import { Router } from 'express';
import {
    refreshToken,

} from '../controllers/refreshToken.controller.js';

const router = Router();

router.post('/', refreshToken);



export default router;