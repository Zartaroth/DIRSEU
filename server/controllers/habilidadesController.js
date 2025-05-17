import Habilidad from '../models/habilidades.js';

// Crear una nueva habilidad
export const createHabilidad = async (req, res) => {
    try {
        const { id_egresado, habilidad, nivel } = req.body;

        // Verificar si los campos requeridos están presentes
        if (!id_egresado || !habilidad || !nivel) {
            return res.status(400).json({ message: 'Faltan datos obligatorios.' });
        }

        // Crear la nueva habilidad
        const nuevaHabilidad = await Habilidad.crear({ id_egresado, habilidad, nivel });

        // Devolver la respuesta con la habilidad creada
        res.status(201).json(nuevaHabilidad);
    } catch (error) {
        console.error('Error al crear habilidad:', error.message);
        res.status(500).json({ message: 'Error al crear la habilidad', error: error.message });
    }
};

// Obtener todas las habilidades de un egresado
export const getHabilidadesByEgresado = async (req, res) => {
    const { id_egresado } = req.params;

    try {
        const habilidades = await Habilidad.obtenerPorEgresado(id_egresado);
        if (habilidades.length === 0) {
            return res.status(404).json({ message: `No se encontraron habilidades para el egresado con ID ${id_egresado}.` });
        }
        res.status(200).json(habilidades);
    } catch (error) {
        console.error(`Error al obtener habilidades para el egresado ${id_egresado}:`, error.message);
        res.status(500).json({ message: 'Error al obtener habilidades', error: error.message });
    }
};

// Obtener todas las habilidades (global)
export const getAllHabilidades = async (req, res) => {
    try {
        const habilidades = await Habilidad.obtenerTodas();
        res.status(200).json(habilidades);
    } catch (error) {
        console.error('Error al obtener todas las habilidades:', error.message);
        res.status(500).json({ message: 'Error al obtener todas las habilidades', error: error.message });
    }
};

// Obtener una habilidad específica por ID
export const getHabilidadById = async (req, res) => {
    const { id } = req.params;

    try {
        const habilidad = await Habilidad.obtenerPorId(id);
        if (!habilidad) {
            return res.status(404).json({ message: `Habilidad con ID ${id} no encontrada.` });
        }
        res.status(200).json(habilidad);
    } catch (error) {
        console.error(`Error al obtener la habilidad con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al obtener la habilidad', error: error.message });
    }
};

// Actualizar una habilidad
export const updateHabilidad = async (req, res) => {
    const { id } = req.params;
    const { habilidad, nivel } = req.body;

    try {
        const existingHabilidad = await Habilidad.obtenerPorId(id);
        if (!existingHabilidad) {
            return res.status(404).json({ message: 'Habilidad no encontrada para actualizar' });
        }

        existingHabilidad.habilidad = habilidad;
        existingHabilidad.nivel = nivel;

        await existingHabilidad.actualizar();
        res.status(200).json({ message: 'Habilidad actualizada exitosamente', habilidad: existingHabilidad });
    } catch (error) {
        console.error(`Error al actualizar la habilidad con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al actualizar la habilidad', error: error.message });
    }
};

// Eliminar una habilidad
export const deleteHabilidad = async (req, res) => {
    const { id } = req.params;

    try {
        const habilidad = await Habilidad.obtenerPorId(id);
        if (!habilidad) {
            return res.status(404).json({ message: 'Habilidad no encontrada para eliminar' });
        }

        await habilidad.eliminar();
        res.status(200).json({ message: 'Habilidad eliminada exitosamente' });
    } catch (error) {
        console.error(`Error al eliminar la habilidad con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al eliminar la habilidad', error: error.message });
    }
};
