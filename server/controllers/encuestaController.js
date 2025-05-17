import Encuesta from '../models/encuesta.js';

// Obtener todas las encuestas
export const getAllEncuestas = async (req, res) => {
    try {
        const encuestas = await Encuesta.obtenerTodos();
        res.status(200).json(encuestas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener encuestas', error: error.message });
    }
};

// Obtener una encuesta por ID
export const getEncuestaById = async (req, res) => {
    const { id } = req.params;
    try {
        const encuesta = await Encuesta.obtenerPorId(id);
        if (!encuesta) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }
        res.status(200).json(encuesta);
    } catch (error) {
        res.status(500).json({ message: `Error al obtener la encuesta con ID ${id}`, error: error.message });
    }
};

// Crear una nueva encuesta
export const createEncuesta = async (req, res) => {
    try {
        // Extracción de campos desde el cuerpo de la solicitud
        const { titulo, descripcion, fecha_inicio, fecha_fin, estado } = req.body;

        // Validación de campos obligatorios
        if (!titulo || !descripcion) {
            return res.status(400).json({ 
                message: 'Los campos título y descripción son obligatorios.' 
            });
        }

        // Preparar objeto de la nueva encuesta con valores predeterminados para los opcionales
        const nuevaEncuesta = {
            titulo,
            descripcion,
            fecha_inicio: fecha_inicio || null, // Asignar null si el campo no está presente
            fecha_fin: fecha_fin || null,       // Asignar null si el campo no está presente
            estado: estado || 'borrador'       // Valor predeterminado para estado
        };

        // Crear la encuesta usando el modelo
        const encuestaCreada = await Encuesta.crear(nuevaEncuesta);

        // Responder con éxito y datos de la encuesta creada
        res.status(201).json({ 
            message: 'Encuesta creada exitosamente', 
            encuesta: encuestaCreada 
        });
    } catch (error) {
        console.error('Error en createEncuesta:', error);

        // Responder con error interno del servidor
        res.status(500).json({ 
            message: 'Error al crear la encuesta', 
            error: error.message 
        });
    }
};


// Obtener encuestas que aun no han expirado
export async function obtenerEncuestasValidas(req, res) {
    try {
        const encuestas = await Encuesta.obtenerPorFecha();
        res.json(encuestas);
    }   catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las encuestas validas' });
    }
}

// Obtener encuestas que no han expirado hasta una fecha especifica
export async function obtenerEncuestasPorFechaEspecifica(req, res) {
    try {
        const fechaEspecifica = req.params.fecha;
        const encuestas = await Encuesta.obtenerPorFechaEspecifica(fechaEspecifica);

        if (encuestas.length > 0) {
            res.json(encuestas);
        }   else {
            res.status(404).json({ error: 'No se encontraron ecuestas hasta la fecha especificada' });
        }
    }   catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener las encuestas por fecha especifica' });
    }
}

// Actualizar una encuesta existente
export const updateEncuesta = async (req, res) => {
    const { id } = req.params; // Obtén el ID de los parámetros de la URL
    const { titulo, descripcion, fecha_inicio, fecha_fin, estado } = req.body; // Extrae datos del cuerpo de la solicitud

    // Validación inicial
    if (!id) {
        return res.status(400).json({ 
            message: 'El ID de la encuesta es obligatorio' 
        });
    }
    if (!titulo || !descripcion) {
        return res.status(400).json({ 
            message: 'Los campos título y descripción son obligatorios para actualizar la encuesta' 
        });
    }

    try {
        // Crear instancia de Encuesta con los valores proporcionados
        const encuesta = new Encuesta({
            id,
            titulo,
            descripcion,
            fecha_inicio: fecha_inicio || null, // Manejo de fechas opcionales
            fecha_fin: fecha_fin || null,       // Manejo de fechas opcionales
            estado: estado || 'borrador'       // Valor predeterminado para estado
        });

        // Intentar actualizar la encuesta
        const updated = await encuesta.actualizar();

        // Manejo si la encuesta no fue encontrada o no se actualizó
        if (!updated) {
            return res.status(404).json({ 
                message: `No se encontró una encuesta con ID ${id} para actualizar` 
            });
        }

        // Responder con éxito si la encuesta fue actualizada
        res.status(200).json({ 
            message: 'Encuesta actualizada exitosamente', 
            encuesta
        });
    } catch (error) {
        console.error(`Error al actualizar la encuesta con ID ${id}:`, error);

        // Manejo de error interno
        res.status(500).json({ 
            message: `Error al actualizar la encuesta con ID ${id}`, 
            error: error.message 
        });
    }
};

// Eliminar una encuesta
export const deleteEncuesta = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Encuesta.eliminar(id); // Método estático
        if (!deleted) {
            return res.status(404).json({ message: 'Encuesta no encontrada para eliminar' });
        }
        res.status(200).json({ message: 'Encuesta eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar la encuesta con ID ${id}`, error: error.message });
    }
};