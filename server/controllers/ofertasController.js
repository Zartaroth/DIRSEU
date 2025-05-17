import { getUserByID } from '../models/users.model.js'; 
import Oferta from '../models/Oferta.js';

// Controlador para obtener las ofertas de un empleador autenticado
export const obtenerOfertasEmpleador = async (req, res) => {
  try {
    // Verifica que req.user está definido y tiene un ID
    const empleadorId = req.user.id; // ID del empleador desde el token

    // Usar el ID del empleador para obtener las ofertas correspondientes
    const ofertas = await Oferta.obtenerPorEmpleador(empleadorId);

    // Si no se encuentran ofertas, devolver un mensaje apropiado
    if (ofertas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron ofertas para este empleador.' });
    }

    // Devolver las ofertas si se encuentran
    res.status(200).json(ofertas);
  } catch (error) {
    // Manejar cualquier error durante la ejecución
    console.error('Error al obtener las ofertas del empleador:', error);
    res.status(500).json({ message: 'Error al obtener las ofertas del empleador.' });
  }
};

// Controlador para crear una nueva oferta de empleo
export const crearOferta = async (req, res) => {
  try {
    console.log('req.user:', req.user); // Asegúrate de que req.user tiene datos
    const { id } = req.user;

    // Verificar si el ID está presente
    if (!id) {
      return res.status(400).json({ message: 'No se encontró el ID del empleador.' });
    }

    const { titulo, descripcion, requisitos, habilidades, experiencia_minima, carrera_destino } = req.body;

    // Validar si los campos requeridos están presentes
    if (!titulo || !carrera_destino) {
      return res.status(400).json({ message: 'Los campos título y carrera destino son obligatorios.' });
    }

    const nuevaOferta = {
      titulo,
      descripcion,
      requisitos,
      habilidades,
      experiencia_minima,
      carrera_destino,
      empleador_id: id
    };

    const ofertaCreada = await Oferta.crear(nuevaOferta);

    res.status(201).json(ofertaCreada);
  } catch (error) {
    console.error('Error al crear la oferta:', error);
    res.status(500).json({ message: 'Error al crear la oferta.' });
  }
};

// Controlador para obtener todas las ofertas
export async function obtenerOfertas(req, res) {
  try {
    const ofertas = await Oferta.obtenerTodas();
    res.json(ofertas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las ofertas de empleo.' });
  }
}

// Controlador para obtener una oferta específica
export async function obtenerOferta(req, res) {
  try {
    const oferta = await Oferta.obtenerPorId(req.params.id);
    if (oferta) {
      res.json(oferta);
    } else {
      res.status(404).json({ error: 'Oferta de empleo no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la oferta de empleo' });
  }
}

// Controlador para actualizar una oferta
export const actualizarOferta = async (req, res) => {
  try {
    const empleadorId = req.user.id; // ID del empleador desde el token
    const ofertaId = req.params.id;
    const { titulo, descripcion, requisitos, habilidades, experiencia_minima, carrera_destino } = req.body;

    const oferta = await Oferta.obtenerPorId(ofertaId);
    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada.' });
    }

    // Verificar que la oferta pertenece al empleador
    if (oferta.empleador_id !== empleadorId) {
      return res.status(403).json({ message: 'No tienes permiso para actualizar esta oferta.' });
    }

    // Actualizar los campos de la oferta
    oferta.titulo = titulo || oferta.titulo;
    oferta.descripcion = descripcion || oferta.descripcion;
    oferta.requisitos = requisitos || oferta.requisitos;
    oferta.habilidades = habilidades || oferta.habilidades;
    oferta.experiencia_minima = experiencia_minima || oferta.experiencia_minima;
    oferta.carrera_destino = carrera_destino || oferta.carrera_destino;

    await oferta.actualizar();
    res.status(200).json({ message: 'Oferta actualizada exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar la oferta:', error);
    res.status(500).json({ message: 'Error al actualizar la oferta.' });
  }
};

// Controlador para eliminar una oferta
export const eliminarOferta = async (req, res) => {
  try {
    const empleadorId = req.user.id; // ID del empleador desde el token
    const ofertaId = req.params.id;

    const oferta = await Oferta.obtenerPorId(ofertaId);
    if (!oferta) {
      return res.status(404).json({ message: 'Oferta no encontrada.' });
    }

    // Verificar que la oferta pertenece al empleador
    if (oferta.empleador_id !== empleadorId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta oferta.' });
    }

    await oferta.eliminar();
    res.status(200).json({ message: 'Oferta eliminada exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar la oferta:', error);
    res.status(500).json({ message: 'Error al eliminar la oferta.' });
  }
};
