import { Router } from 'express';
const router = Router();
import {
  crearOferta,
  obtenerOfertas,
  obtenerOferta,
  actualizarOferta,
  eliminarOferta,
  obtenerOfertasEmpleador
  // obtenerOfertasPorEmpleador
} from '../controllers/ofertasController.js';
// Middleware de autenticación
import { authenticate } from '../utils/authenticate.js';

// Crear una oferta
router.post('/',authenticate, crearOferta);

// Obtener ofertas por empleador (Ruta protegida)
router.get('/empleador/ofertas', obtenerOfertasEmpleador);

// Obtener todas las ofertas
router.get('/', obtenerOfertas);

// Obtener una oferta por ID
router.get('/:id', obtenerOferta);

// Actualizar una oferta
router.put('/:id', actualizarOferta);

// Eliminar una oferta
router.delete('/:id', eliminarOferta);



// router.get('/empleador/:empleadorId', obtenerOfertasPorEmpleador);

export default router;
