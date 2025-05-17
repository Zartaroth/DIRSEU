import { Router } from 'express';
import {
    refreshUser,
    getUserInfo,
    changePassword,
} from '../controllers/user.controller.js';

const router = Router();

router.get('/', refreshUser);
router.get('/info', getUserInfo);
router.post('/change-password', changePassword);

export default router;