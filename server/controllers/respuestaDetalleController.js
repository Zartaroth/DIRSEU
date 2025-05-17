import RespuestaDetalle from '../models/respuestaDetalle.js';

// Obtener todos los detalles de una respuesta
export const getAllRespuestaDetalles = async (req, res) => {
    const { respuesta_id } = req.params;
    try {
        const detalles = await RespuestaDetalle.getAllByRespuestaId(respuesta_id);
        if (detalles.length === 0) {
            return res.status(404).json({ message: 'No se encontraron detalles para esta respuesta' });
        }
        res.status(200).json(detalles);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los detalles', error: error.message });
    }
};

// Obtener un detalle específico por ID
export const getRespuestaDetalleById = async (req, res) => {
    const { id } = req.params;
    try {
        const detalle = await RespuestaDetalle.getById(id);
        if (!detalle) {
            return res.status(404).json({ message: 'Detalle no encontrado' });
        }
        res.status(200).json(detalle);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener el detalle con ID ${id}`, error: error.message });
    }
};

// Crear un nuevo detalle de respuesta
export const createRespuestaDetalle = async (req, res) => {
    const { respuesta_id, pregunta_id, opcion_id, respuesta_texto, respuesta_numerica } = req.body;
    try {
        const newDetalleId = await RespuestaDetalle.create({
            respuesta_id,
            pregunta_id,
            opcion_id,
            respuesta_texto,
            respuesta_numerica
        });
        res.status(201).json({ message: 'Detalle de respuesta creado exitosamente', id: newDetalleId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el detalle de la respuesta', error: error.message });
    }
};

// Eliminar un detalle de respuesta
export const deleteRespuestaDetalle = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await RespuestaDetalle.delete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Detalle no encontrado para eliminar' });
        }
        res.status(200).json({ message: 'Detalle de respuesta eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar el detalle con ID ${id}`, error: error.message });
    }
};
