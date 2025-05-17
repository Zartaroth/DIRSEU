import Idioma from '../models/idiomas.js';

// Crear un nuevo idioma
export const createIdioma = async (req, res) => {
    const { id_egresado, idioma, nivel } = req.body;

    try {
        if (!id_egresado || !idioma || !nivel) {
            return res.status(400).json({ message: 'Faltan datos obligatorios.' });
        }

        const nuevoIdioma = await Idioma.crear({ id_egresado, idioma, nivel });

        res.status(201).json(nuevoIdioma);
    } catch (error) {
        console.error('Error al crear el idioma:', error.message);
        res.status(500).json({ message: 'Error al crear el idioma', error: error.message });
    }
};

// Obtener todos los idiomas de un egresado
export const getIdiomasByEgresado = async (req, res) => {
    const { id_egresado } = req.params;

    try {
        const idiomas = await Idioma.obtenerPorEgresado(id_egresado);
        if (idiomas.length === 0) {
            return res.status(404).json({ message: `No se encontraron idiomas para el egresado con ID ${id_egresado}.` });
        }
        res.status(200).json(idiomas);
    } catch (error) {
        console.error(`Error al obtener idiomas para el egresado ${id_egresado}:`, error.message);
        res.status(500).json({ message: 'Error al obtener los idiomas', error: error.message });
    }
};

// Obtener todos los idiomas
export const getAllIdiomas = async (req, res) => {
    try {
        const idiomas = await Idioma.obtenerTodos();
        res.status(200).json(idiomas);
    } catch (error) {
        console.error('Error al obtener todos los idiomas:', error.message);
        res.status(500).json({ message: 'Error al obtener todos los idiomas', error: error.message });
    }
};

// Obtener un idioma específico por ID
export const getIdiomaById = async (req, res) => {
    const { id } = req.params;

    try {
        const idioma = await Idioma.obtenerPorId(id);
        if (!idioma) {
            return res.status(404).json({ message: `Idioma con ID ${id} no encontrado.` });
        }
        res.status(200).json(idioma);
    } catch (error) {
        console.error(`Error al obtener el idioma con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al obtener el idioma', error: error.message });
    }
};

// Actualizar un idioma existente
export const updateIdioma = async (req, res) => {
    const { id } = req.params;
    const { idioma, nivel } = req.body;

    try {
        const idiomaExistente = await Idioma.obtenerPorId(id);
        if (!idiomaExistente) {
            return res.status(404).json({ message: 'Idioma no encontrado para actualizar' });
        }

        idiomaExistente.idioma = idioma;
        idiomaExistente.nivel = nivel;

        await idiomaExistente.actualizar();
        res.status(200).json({ message: 'Idioma actualizado exitosamente', idiomaExistente });
    } catch (error) {
        console.error(`Error al actualizar el idioma con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al actualizar el idioma', error: error.message });
    }
};

// Eliminar un idioma
export const deleteIdioma = async (req, res) => {
    const { id } = req.params;

    try {
        const idiomaExistente = await Idioma.obtenerPorId(id);
        if (!idiomaExistente) {
            return res.status(404).json({ message: 'Idioma no encontrado para eliminar' });
        }

        await idiomaExistente.eliminar();
        res.status(200).json({ message: 'Idioma eliminado exitosamente' });
    } catch (error) {
        console.error(`Error al eliminar el idioma con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al eliminar el idioma', error: error.message });
    }
};
