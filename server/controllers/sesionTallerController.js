import SesionTaller from '../models/sesionTaller.js';

// Obtener todas las sesiones de un taller por su ID
export const getAllSesionesByTallerId = async (req, res) => {
    const { tallerId } = req.params;

    try {
        // Llamar al modelo para obtener las sesiones asociadas al taller
        const sesiones = await SesionTaller.obtenerPorTallerId(tallerId);

        // Verificar si hay sesiones asociadas al taller
        if (!sesiones || sesiones.length === 0) {
            return res.status(404).json({ message: `No se encontraron sesiones para el taller con ID ${tallerId}.` });
        }

        res.status(200).json(sesiones);
    } catch (error) {
        console.error(`Error al obtener sesiones para el taller con ID ${tallerId}:`, error.message);
        res.status(500).json({ message: 'Error al obtener sesiones', error: error.message });
    }
};

// Obtener una sesión de taller por su ID
export const getSesionById = async (req, res) => {
    const { id } = req.params;

    try {
        // Llamar al modelo para obtener la sesión
        const sesion = await SesionTaller.obtenerPorId(id);

        // Verificar si la sesión existe
        if (!sesion) {
            return res.status(404).json({ message: `Sesión con ID ${id} no encontrada.` });
        }

        res.status(200).json(sesion);
    } catch (error) {
        console.error(`Error al obtener la sesión con ID ${id}:`, error.message);
        res.status(500).json({ message: `Error al obtener la sesión con ID ${id}`, error: error.message });
    }
};

// Crear una nueva sesión de taller
export const createSesionTaller = async (req, res) => {
    const { id_taller, fecha, tipo, detalle } = req.body;

    try {
        const nuevaSesion = await SesionTaller.crear({ id_taller, fecha, tipo, detalle });
        res.status(201).json({ message: 'Sesión de taller creada exitosamente', sesion: nuevaSesion });
    } catch (error) {
        console.error('Error al crear la sesión:', error.message);
        res.status(500).json({ message: 'Error al crear la sesión', error: error.message });
    }
};

// Actualizar una sesión de taller existente
export const updateSesionTaller = async (req, res) => {
    const { id } = req.params;
    const { fecha, tipo, detalle } = req.body;

    try {
        const sesion = await SesionTaller.obtenerPorId(id);
        if (!sesion) {
            return res.status(404).json({ message: 'Sesión no encontrada para actualizar' });
        }

        sesion.fecha = fecha;
        sesion.tipo = tipo;
        sesion.detalle = detalle;

        const updated = await sesion.actualizar();
        if (!updated) {
            return res.status(500).json({ message: 'Error al actualizar la sesión' });
        }

        res.status(200).json({ message: 'Sesión actualizada exitosamente' });
    } catch (error) {
        console.error(`Error al actualizar la sesión con ID ${id}:`, error.message);
        res.status(500).json({ message: `Error al actualizar la sesión con ID ${id}`, error: error.message });
    }
};

// Eliminar una sesión de taller
export const deleteSesionTaller = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedId = await SesionTaller.eliminar(id);
        if (deletedId) {
            res.status(200).json({ message: `Sesión con ID ${deletedId} eliminada exitosamente` });
        } else {
            res.status(404).json({ message: 'Sesión no encontrada para eliminar' });
        }
    } catch (error) {
        console.error(`Error al eliminar la sesión con ID ${id}:`, error.message);
        res.status(500).json({ message: `Error al eliminar la sesión con ID ${id}`, error: error.message });
    }
};
