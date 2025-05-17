import { Router } from 'express';
import { pool } from '../utils/db.js';

const router = Router();

router.get('/ping', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM Categorias');
    console.log(rows);
    res.json(rows);
})

export default router;