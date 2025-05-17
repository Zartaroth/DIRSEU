import FormacionAcademica from '../models/formacionAcademica.js';

// Crear una nueva formación académica
export const createFormacionAcademica = async (req, res) => {
    try {
        const { id_egresado, institucion, titulo, descripcion, fecha_inicio, fecha_fin } = req.body;

        if (!id_egresado || !institucion || !titulo || !fecha_inicio) {
            return res.status(400).json({ message: 'Faltan datos obligatorios.' });
        }

        // Validación de fechas
        FormacionAcademica.validarFechas(fecha_inicio, fecha_fin);

        const nuevaFormacion = await FormacionAcademica.crear({ 
            id_egresado, 
            institucion, 
            titulo, 
            descripcion, 
            fecha_inicio, 
            fecha_fin 
        });

        res.status(201).json(nuevaFormacion);
    } catch (error) {
        console.error('Error al crear formación académica:', error.message);
        res.status(500).json({ message: 'Error al crear la formación académica', error: error.message });
    }
};

// Obtener todas las formaciones académicas de un egresado
export const getFormacionesByEgresado = async (req, res) => {
    const { id_egresado } = req.params;

    try {
        const formaciones = await FormacionAcademica.obtenerPorEgresado(id_egresado);
        if (formaciones.length === 0) {
            return res.status(404).json({ message: `No se encontraron formaciones académicas para el egresado con ID ${id_egresado}.` });
        }
        res.status(200).json(formaciones);
    } catch (error) {
        console.error(`Error al obtener formaciones académicas para el egresado ${id_egresado}:`, error.message);
        res.status(500).json({ message: 'Error al obtener formaciones académicas', error: error.message });
    }
};

// Obtener todas las formaciones académicas
export const getAllFormaciones = async (req, res) => {
    try {
        const formaciones = await FormacionAcademica.obtenerTodas();
        res.status(200).json(formaciones);
    } catch (error) {
        console.error('Error al obtener todas las formaciones académicas:', error.message);
        res.status(500).json({ message: 'Error al obtener todas las formaciones académicas', error: error.message });
    }
};

// Obtener una formación académica específica por ID
export const getFormacionById = async (req, res) => {
    const { id } = req.params;

    try {
        const formacion = await FormacionAcademica.obtenerPorId(id);
        if (!formacion) {
            return res.status(404).json({ message: `Formación académica con ID ${id} no encontrada.` });
        }
        res.status(200).json(formacion);
    } catch (error) {
        console.error(`Error al obtener la formación académica con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al obtener la formación académica', error: error.message });
    }
};

// Actualizar una formación académica
export const updateFormacionAcademica = async (req, res) => {
    const { id } = req.params;
    const { institucion, titulo, descripcion, fecha_inicio, fecha_fin } = req.body;

    try {
        const formacion = await FormacionAcademica.obtenerPorId(id);
        if (!formacion) {
            return res.status(404).json({ message: 'Formación académica no encontrada para actualizar' });
        }

        // Validación de fechas
        FormacionAcademica.validarFechas(fecha_inicio, fecha_fin);

        formacion.institucion = institucion;
        formacion.titulo = titulo;
        formacion.descripcion = descripcion;
        formacion.fecha_inicio = fecha_inicio;
        formacion.fecha_fin = fecha_fin;

        await formacion.actualizar();
        res.status(200).json({ message: 'Formación académica actualizada exitosamente', formacion });
    } catch (error) {
        console.error(`Error al actualizar la formación académica con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al actualizar la formación académica', error: error.message });
    }
};

// Eliminar una formación académica
export const deleteFormacionAcademica = async (req, res) => {
    const { id } = req.params;

    try {
        const formacion = await FormacionAcademica.obtenerPorId(id);
        if (!formacion) {
            return res.status(404).json({ message: 'Formación académica no encontrada para eliminar' });
        }

        await formacion.eliminar();
        res.status(200).json({ message: 'Formación académica eliminada exitosamente' });
    } catch (error) {
        console.error(`Error al eliminar la formación académica con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al eliminar la formación académica', error: error.message });
    }
};
