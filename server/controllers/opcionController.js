import OpcionPregunta from '../models/OpcionPregunta.js';

// Obtener todas las opciones de pregunta
export const getAllOpciones = async (req, res) => {
    try {
        const opciones = await OpcionPregunta.obtenerTodos();
        res.status(200).json(opciones);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener opciones de pregunta', error: error.message });
    }
};

// Obtener una opción de pregunta por ID
export const getOpcionById = async (req, res) => {
    const { id } = req.params;
    try {
        const opcionPregunta = await OpcionPregunta.obtenerPorId(id);
        if (!opcionPregunta) {
            return res.status(404).json({ message: 'Opción de pregunta no encontrada' });
        }
        res.status(200).json(opcionPregunta);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener la opción de pregunta con ID ${id}`, error: error.message });
    }
};

// Obtener todas las opciones de una pregunta específica
export const getOpcionesByPreguntaId = async (req, res) => {
    const { pregunta_id } = req.params;
    try {
        const opciones = await OpcionPregunta.obtenerPorPreguntaId(pregunta_id);
        if (opciones.length === 0) {
            return res.status(404).json({ message: 'No se encontraron opciones para esta pregunta' });
        }
        res.status(200).json(opciones);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener opciones para la pregunta con ID ${pregunta_id}`, error: error.message });
    }
};

// Crear una nueva opción de pregunta
export const createOpcion = async (req, res) => {
    const { pregunta_id, texto } = req.body;
    try {
        if (!pregunta_id || !texto) {
            return res.status(400).json({ message: 'Faltan parámetros requeridos para crear la opción' });
        }

        const nuevaOpcion = { pregunta_id, texto };
        const opcionPregunta = await OpcionPregunta.crear(nuevaOpcion);

        res.status(201).json({ message: 'Opción de pregunta creada exitosamente', opcionPregunta });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la opción de pregunta', error: error.message });
    }
};

// Actualizar una opción de pregunta existente
export const updateOpcion = async (req, res) => {
    const { id } = req.params;
    const { texto } = req.body;

    if (!texto) {
        return res.status(400).json({ message: 'Falta el texto de la opción para actualizar' });
    }

    try {
        const opcionPregunta = await OpcionPregunta.obtenerPorId(id);
        if (!opcionPregunta) {
            return res.status(404).json({ message: 'Opción de pregunta no encontrada' });
        }

        opcionPregunta.texto = texto;
        const updated = await opcionPregunta.actualizar();

        if (updated) {
            res.status(200).json({ message: 'Opción de pregunta actualizada exitosamente' });
        } else {
            res.status(500).json({ message: 'Error al actualizar la opción de pregunta' });
        }
    } catch (error) {
        res.status(500).json({ message: `Error al actualizar la opción de pregunta con ID ${id}`, error: error.message });
    }
};

// Eliminar una opción de pregunta
export const deleteOpcion = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await OpcionPregunta.eliminar(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Opción de pregunta no encontrada para eliminar' });
        }
        res.status(200).json({ message: 'Opción de pregunta eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar la opción de pregunta con ID ${id}`, error: error.message });
    }
};
