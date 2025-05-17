import Postulacion from '../models/postulaciones.js';

// Crear una nueva postulación
export const createPostulacion = async (req, res) => {
  const { egresado_id, oferta_id } = req.body;

  try {
    if (!egresado_id || !oferta_id) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    // Verificar si ya existe una postulación previa
    const postulacionExistente = await Postulacion.verificarPostulacion(egresado_id, oferta_id);

    if (postulacionExistente) {
      return res.status(200).json({ message: "Ya se realizó una postulación previa." });
    }

    // Crear la nueva postulación
    const nuevaPostulacion = await Postulacion.crear({
      egresado_id,
      oferta_id,
      estado_postulacion: "Recibido",
      fecha_postulacion: new Date(),
    });

    return res.status(201).json(nuevaPostulacion);
  } catch (error) {
    console.error("Error al crear la postulación:", error.message);
    return res.status(500).json({ message: "Error al crear la postulación", error: error.message });
  }
};

// Obtener todas las postulaciones en una oferta laboral
export const getPostulacionesByOferta = async (req, res) => {
  const { oferta_id } = req.params;
  try {
    const postulaciones = await Postulacion.obtenerPorOferta(oferta_id);
    if (postulaciones.length === 0) {
      return res.status(404).json({ message: `No se encontraron postulaciones en la oferta ${oferta_id}. `});
    }
    res.status(200).json(postulaciones);
  } catch (error) {
    console.error(`Error al obtner postulaciones para la oferta laboral de id ${oferta_id}:`, error.message);
    res.status(500).json({ message: 'Error al obtener las postulaciones por oferta laboral', error: error.message });
  }
}

// Obtener todas las postulaciones de un egresado
export const getPostulacionesByEgresado = async (req, res) => {
  const { egresado_id } = req.params;

  try {
    const postulaciones = await Postulacion.obtenerPorEgresado(egresado_id);
    if (postulaciones.length === 0) {
      return res.status(404).json({ message: `No se encontraron postulaciones para el egresado con ID ${egresado_id}.` });
    }
    res.status(200).json(postulaciones);
  } catch (error) {
    console.error(`Error al obtener postulaciones para el egresado ${egresado_id}:`, error.message);
    res.status(500).json({ message: 'Error al obtener las postulaciones', error: error.message });
  }
};

// Obtener todas las postulaciones
export const getAllPostulaciones = async (req, res) => {
  try {
    const postulaciones = await Postulacion.obtenerTodos();
    res.status(200).json(postulaciones);
  } catch (error) {
    console.error('Error al obtener todas las postulaciones:', error.message);
    res.status(500).json({ message: 'Error al obtener todas las postulaciones', error: error.message });
  }
};

// Obtener una postulación específica por ID
export const getPostulacionById = async (req, res) => {
  const { id } = req.params;

  try {
    const postulacion = await Postulacion.obtenerPorId(id);
    if (!postulacion) {
      return res.status(404).json({ message: `Postulación con ID ${id} no encontrada.` });
    }
    res.status(200).json(postulacion);
  } catch (error) {
    console.error(`Error al obtener la postulación con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al obtener la postulación', error: error.message });
  }
};

// Actualizar una postulación existente
export const updatePostulacion = async (req, res) => {
  const { id } = req.params;
  const { estado_postulacion, fecha_postulacion } = req.body;

  try {
    const postulacionExistente = await Postulacion.obtenerPorId(id);
    if (!postulacionExistente) {
      return res.status(404).json({ message: 'Postulación no encontrada para actualizar' });
    }

    postulacionExistente.estado_postulacion = estado_postulacion;
    postulacionExistente.fecha_postulacion = fecha_postulacion;

    await postulacionExistente.actualizar();
    res.status(200).json({ message: 'Postulación actualizada exitosamente', postulacionExistente });
  } catch (error) {
    console.error(`Error al actualizar la postulación con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al actualizar la postulación', error: error.message });
  }
};

// Eliminar una postulación
export const deletePostulacion = async (req, res) => {
  const { id } = req.params;

  try {
    const postulacionExistente = await Postulacion.obtenerPorId(id);
    if (!postulacionExistente) {
      return res.status(404).json({ message: 'Postulación no encontrada para eliminar' });
    }

    await postulacionExistente.eliminar();
    res.status(200).json({ message: 'Postulación eliminada exitosamente' });
  } catch (error) {
    console.error(`Error al eliminar la postulación con ID ${id}:`, error.message);
    res.status(500).json({ message: 'Error al eliminar la postulación', error: error.message });
  }
};
