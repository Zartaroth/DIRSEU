import PublicacionEncuesta from '../models/publicacionEncuesta.js';

// Obtener todas las publicaciones de encuestas
export const getAllPublicaciones = async (req, res) => {
    try {
        const publicaciones = await PublicacionEncuesta.getAll();
        res.status(200).json(publicaciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener publicaciones', error: error.message });
    }
};

// Obtener una publicación específica por ID
export const getPublicacionById = async (req, res) => {
    const { id } = req.params;
    try {
        const publicacion = await PublicacionEncuesta.getById(id);
        if (!publicacion) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }
        res.status(200).json(publicacion);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener la publicación con ID ${id}`, error: error.message });
    }
};

// Crear una nueva publicación
export const createPublicacion = async (req, res) => {
    const { encuesta_id, estado, publico_objetivo, fecha_cierre } = req.body;
    try {
        const newPublicacionId = await PublicacionEncuesta.create({ encuesta_id, estado, publico_objetivo, fecha_cierre });
        res.status(201).json({ message: 'Publicación creada exitosamente', id: newPublicacionId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la publicación', error: error.message });
    }
};

// Actualizar una publicación existente
export const updatePublicacion = async (req, res) => {
    const { id } = req.params;
    const { estado, publico_objetivo, fecha_cierre } = req.body;
    try {
        const updated = await PublicacionEncuesta.update(id, { estado, publico_objetivo, fecha_cierre });
        if (!updated) {
            return res.status(404).json({ message: 'Publicación no encontrada para actualizar' });
        }
        res.status(200).json({ message: 'Publicación actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: `Error al actualizar la publicación con ID ${id}`, error: error.message });
    }
};

// Eliminar una publicación
export const deletePublicacion = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await PublicacionEncuesta.delete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Publicación no encontrada para eliminar' });
        }
        res.status(200).json({ message: 'Publicación eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar la publicación con ID ${id}`, error: error.message });
    }
};
