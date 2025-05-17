import Pregunta from '../models/pregunta.js';

// Obtener todas las preguntas de una encuesta
export const getAllPreguntasByEncuestaId = async (req, res) => {
    const { encuestaId } = req.params;

    try {
        // Llamar al modelo para obtener las preguntas con sus opciones
        const preguntas = await Pregunta.obtenerPorEncuestaId(encuestaId);

        // Verificar si hay preguntas asociadas a la encuesta
        if (!preguntas || preguntas.length === 0) {
            return res.status(404).json({ message: `No se encontraron preguntas para la encuesta con ID ${encuestaId}.` });
        }

        res.status(200).json(preguntas);
    } catch (error) {
        console.error(`Error al obtener preguntas para la encuesta con ID ${encuestaId}:`, error.message);
        res.status(500).json({ message: 'Error al obtener preguntas', error: error.message });
    }
};

// Obtener una pregunta por su ID
export const getPreguntaById = async (req, res) => {
    const { id } = req.params;

    try {
        // Llamar al modelo para obtener la pregunta con sus opciones
        const pregunta = await Pregunta.obtenerPorId(id);

        // Verificar si la pregunta existe
        if (!pregunta) {
            return res.status(404).json({ message: `Pregunta con ID ${id} no encontrada.` });
        }

        res.status(200).json(pregunta);
    } catch (error) {
        console.error(`Error al obtener la pregunta con ID ${id}:`, error.message);
        res.status(500).json({ message: `Error al obtener la pregunta con ID ${id}`, error: error.message });
    }
};

// Crear una nueva pregunta
export const createPregunta = async (req, res) => {
    const { encuesta_id, texto, tipo } = req.body;
    try {
        const nuevaPregunta = await Pregunta.crear({ encuesta_id, texto, tipo });
        res.status(201).json({ message: 'Pregunta creada exitosamente', pregunta: nuevaPregunta });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la pregunta', error: error.message });
    }
};

// Actualizar una pregunta existente
export const updatePregunta = async (req, res) => {
    const { id } = req.params;
    const { texto, tipo } = req.body;
    try {
        const pregunta = await Pregunta.obtenerPorId(id);
        if (!pregunta) {
            return res.status(404).json({ message: 'Pregunta no encontrada para actualizar' });
        }

        pregunta.texto = texto;
        pregunta.tipo = tipo;

        const updated = await pregunta.actualizar();
        if (!updated) {
            return res.status(500).json({ message: 'Error al actualizar la pregunta' });
        }

        res.status(200).json({ message: 'Pregunta actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: `Error al actualizar la pregunta con ID ${id}`, error: error.message });
    }
};

// Eliminar una pregunta
export const deletePregunta = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedId = await Pregunta.eliminar(id);
        if (deletedId) {
            res.status(200).json({ message: `Pregunta con ID ${deletedId} eliminada exitosamente` });
        } else {
            res.status(404).json({ message: 'Pregunta no encontrada para eliminar' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar la pregunta con ID ${id}`, error: error.message });
    }
};
