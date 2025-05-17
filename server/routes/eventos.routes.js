import express from 'express';
import { crearEvento, obtenerEventos, obtenerEvento, obtenerEventosPorCoordinador, actualizarEvento, eliminarEvento } from '../controllers/eventosController.js';
import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Carpeta donde se almacenarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'IMAGE-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Función para validar tipos de archivos
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/; // Asegúrate de incluir webp
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Solo imágenes (jpeg, jpg, png, gif, webp) son permitidas.'));
  }
}

// Inicializar Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limitar el tamaño a 5MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

const router = express.Router();

// Crear un nuevo evento
router.post('/', upload.single('imagen'), crearEvento); // Aplicar Multer aquí, campo 'Imagen'

// Obtener todos los eventos
router.get('/', obtenerEventos);

router.get('/coordinador/:codigo_coordinador', obtenerEventosPorCoordinador);

// Obtener un evento específico
router.get('/:id', obtenerEvento);

// Actualizar un evento
router.put('/:id', upload.single('imagen'), actualizarEvento); // Aplicar Multer aquí, campo 'Imagen'

// Eliminar un evento
router.delete('/:id', eliminarEvento);

export default router;
