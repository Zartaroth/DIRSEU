import Logro from '../models/logros.js';

// Crear un nuevo logro
export const createLogro = async (req, res) => {
    const { id_egresado, logro, descripcion, fecha } = req.body;

    try {
        // Verificar que los campos obligatorios estén presentes
        if (!id_egresado || !logro || !descripcion || !fecha) {
            return res.status(400).json({ message: 'Faltan datos obligatorios.' });
        }

        // Crear el nuevo logro
        const nuevoLogro = await Logro.crear({ id_egresado, logro, descripcion, fecha });

        // Responder con el logro creado
        res.status(201).json(nuevoLogro);
    } catch (error) {
        console.error('Error al crear el logro:', error.message);
        res.status(500).json({ message: 'Error al crear el logro', error: error.message });
    }
};

// Obtener todos los logros de un egresado
export const getLogrosByEgresado = async (req, res) => {
    const { id_egresado } = req.params;

    try {
        // Obtener los logros del egresado
        const logros = await Logro.obtenerPorEgresado(id_egresado);
        if (logros.length === 0) {
            return res.status(404).json({ message: `No se encontraron logros para el egresado con ID ${id_egresado}.` });
        }
        res.status(200).json(logros);
    } catch (error) {
        console.error(`Error al obtener logros para el egresado ${id_egresado}:`, error.message);
        res.status(500).json({ message: 'Error al obtener los logros', error: error.message });
    }
};

// Obtener todos los logros
export const getAllLogros = async (req, res) => {
    try {
        // Obtener todos los logros
        const logros = await Logro.obtenerTodos();
        res.status(200).json(logros);
    } catch (error) {
        console.error('Error al obtener todos los logros:', error.message);
        res.status(500).json({ message: 'Error al obtener todos los logros', error: error.message });
    }
};

// Obtener un logro específico por ID
export const getLogroById = async (req, res) => {
    const { id } = req.params;

    try {
        // Obtener el logro por su ID
        const logro = await Logro.obtenerPorId(id);
        if (!logro) {
            return res.status(404).json({ message: `Logro con ID ${id} no encontrado.` });
        }
        res.status(200).json(logro);
    } catch (error) {
        console.error(`Error al obtener el logro con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al obtener el logro', error: error.message });
    }
};

// Actualizar un logro existente
export const updateLogro = async (req, res) => {
    const { id } = req.params;
    const { logro, descripcion, fecha } = req.body;

    try {
        // Verificar si el logro existe
        const logroExistente = await Logro.obtenerPorId(id);
        if (!logroExistente) {
            return res.status(404).json({ message: 'Logro no encontrado para actualizar' });
        }

        // Actualizar el logro
        logroExistente.logro = logro;
        logroExistente.descripcion = descripcion;
        logroExistente.fecha = fecha;

        // Guardar los cambios
        await logroExistente.actualizar();
        res.status(200).json({ message: 'Logro actualizado exitosamente', logroExistente });
    } catch (error) {
        console.error(`Error al actualizar el logro con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al actualizar el logro', error: error.message });
    }
};

// Eliminar un logro
export const deleteLogro = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si el logro existe
        const logroExistente = await Logro.obtenerPorId(id);
        if (!logroExistente) {
            return res.status(404).json({ message: 'Logro no encontrado para eliminar' });
        }

        // Eliminar el logro
        await logroExistente.eliminar();
        res.status(200).json({ message: 'Logro eliminado exitosamente' });
    } catch (error) {
        console.error(`Error al eliminar el logro con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al eliminar el logro', error: error.message });
    }
};
