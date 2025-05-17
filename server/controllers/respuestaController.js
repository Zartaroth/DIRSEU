import Respuesta from '../models/respuesta.js';

// Crear una nueva respuesta
export const createRespuesta = async (req, res) => {
    const { encuesta_id, pregunta_id, usuario_id, respuesta } = req.body;

    // Validación básica
    if (!encuesta_id || !pregunta_id || !respuesta) {
        return res.status(400).json({ message: 'Faltan datos obligatorios para crear la respuesta' });
    }

    try {
        const nuevaRespuesta = await Respuesta.crear({
            encuesta_id,
            pregunta_id,
            usuario_id,
            respuesta,
        });

        res.status(201).json({
            message: 'Respuesta creada exitosamente',
            respuesta: nuevaRespuesta,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al crear la respuesta',
            error: error.message,
        });
    }
};

// Controlador para obtener las respuestas agrupadas por pregunta de una encuesta
export const getRespuestasByEncuesta = async (req, res) => {
    const { encuesta_id } = req.params;

    // Validación del parámetro encuesta_id
    if (!encuesta_id) {
        return res.status(400).json({ 
            message: 'El ID de la encuesta es obligatorio' 
        });
    }

    try {
        // Llama al método que agrupa las respuestas por pregunta
        const respuestasAgrupadas = await Respuesta.obtenerPorEncuesta(encuesta_id);

        // Respuesta exitosa con las respuestas agrupadas
        return res.status(200).json({
            success: true,
            data: respuestasAgrupadas,
        });
    } catch (error) {
        console.error(`Error al obtener las respuestas de la encuesta con ID ${encuesta_id}:`, error);

        // Manejo de errores en la respuesta
        return res.status(500).json({
            success: false,
            message: `Error al obtener las respuestas de la encuesta con ID ${encuesta_id}`,
            error: error.message,
        });
    }
};

// Obtener todas las respuestas de una pregunta específica
export const getRespuestasByPregunta = async (req, res) => {
    const { pregunta_id } = req.params;

    if (!pregunta_id) {
        return res.status(400).json({ message: 'El ID de la pregunta es obligatorio' });
    }

    try {
        const respuestas = await Respuesta.obtenerPorPregunta(pregunta_id);
        res.status(200).json(respuestas);
    } catch (error) {
        res.status(500).json({
            message: `Error al obtener las respuestas de la pregunta con ID ${pregunta_id}`,
            error: error.message,
        });
    }
};

// Obtener una respuesta específica por ID
export const getRespuestaById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'El ID de la respuesta es obligatorio' });
    }

    try {
        const respuesta = await Respuesta.obtenerPorId(id);
        if (!respuesta) {
            return res.status(404).json({ message: 'Respuesta no encontrada' });
        }
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({
            message: `Error al obtener la respuesta con ID ${id}`,
            error: error.message,
        });
    }
};

// Actualizar una respuesta existente
export const updateRespuesta = async (req, res) => {
    const { id } = req.params;
    const { encuesta_id, pregunta_id, usuario_id, respuesta } = req.body;

    if (!id || !encuesta_id || !pregunta_id || !respuesta) {
        return res.status(400).json({ message: 'Faltan datos obligatorios para actualizar la respuesta' });
    }

    try {
        const respuestaExistente = new Respuesta({
            id,
            encuesta_id,
            pregunta_id,
            usuario_id,
            respuesta,
        });

        const updated = await respuestaExistente.actualizar();

        if (!updated) {
            return res.status(404).json({ message: 'Respuesta no encontrada para actualizar' });
        }

        res.status(200).json({ message: 'Respuesta actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({
            message: `Error al actualizar la respuesta con ID ${id}`,
            error: error.message,
        });
    }
};

// Eliminar una respuesta
export const deleteRespuesta = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'El ID de la respuesta es obligatorio' });
    }

    try {
        const deleted = await Respuesta.eliminar(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Respuesta no encontrada para eliminar' });
        }

        res.status(200).json({ message: 'Respuesta eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({
            message: `Error al eliminar la respuesta con ID ${id}`,
            error: error.message,
        });
    }
};
