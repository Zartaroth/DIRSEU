import { Router } from 'express';
import {
    getCategories,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct
} from '../controllers/task.controller.js';

const router = Router();

router.get('/categories', getCategories);

router.get('/products', getProducts);

router.get('/products/:id', getProduct);

router.post('/products', createProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);


export default router;