import Asistencia from '../models/asistencia.js';

// Crear una nueva asistencia
export const createAsistencia = async (req, res) => {
    try {
      const { id_taller, id_estudiante, id_sesion, estado } = req.body;
  
      // Validar datos obligatorios
      if (!id_taller || !id_estudiante || !id_sesion || !estado) {
        return res.status(400).json({ message: 'Faltan datos obligatorios.' });
      }
  
      const nuevaAsistencia = await Asistencia.crear({ id_taller, id_estudiante, id_sesion, estado });
      res.status(201).json(nuevaAsistencia);
    } catch (error) {
      console.error('Error al crear asistencia:', error.message);
      res.status(500).json({ message: 'Error al crear la asistencia', error: error.message });
    }
  };

export const getAsistenciasByFechaAndTaller = async (req, res) => {
    const { id_taller, fecha } = req.params;

    try {
        const asistencias = await Asistencia.obtenerPorFechaYPorTaller(id_taller, fecha);

        if (!asistencias) {
            return res.status(404).json({ message: `No se encontraron asistencias para el taller con ID ${id_taller} en la fecha ${fecha}.` });
        }

        res.status(200).json(asistencias);
    } catch (error) {
        console.error(`Error al obtener asistencias para el taller ${id_taller} y la fecha ${fecha}:`, error.message);
        res.status(500).json({ message: 'Error al obtener asistencias', error: error.message });
    }
};

// Para obtener las asistencias detalladas

export const obtenerAsistenciasDetalladas = async (req, res) => {
    const { id_taller, id_sesion } = req.params;

    try {
        // Llamada al método para obtener las asistencias
        const resultado = await Asistencia.obtenerAsistenciasDetalladas(id_taller, id_sesion);

        // Si no se encuentran resultados, retornar mensaje adecuado
        if (!resultado) {
            return res.status(404).json({ mensaje: "No se encontraron asistencias para el taller y sesión especificados." });
        }

        // Enviar respuesta con los resultados
        res.json(resultado);
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ mensaje: "Error al obtener asistencias.", error });
    }
};

// Obtener todas las asistencias de un taller
export const getAllAsistenciasByTallerId = async (req, res) => {
  const { id_taller } = req.params;

  try {
    const asistencias = await Asistencia.obtenerAsistenciasPorTaller(id_taller);
    if (!asistencias || Object.keys(asistencias).length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron asistencias para el taller especificado." });
    }
    res.status(200).json({ asistencias });
  } catch (error) {
    console.error("Error en el controlador:", error.message);
    res.status(500).json({ mensaje: "Error al obtener asistencias", error: error.message });
  }
};

// Obtener una asistencia específica por ID
export const getAsistenciaById = async (req, res) => {
    const { id } = req.params;

    try {
        const asistencia = await Asistencia.obtenerPorId(id);
        if (!asistencia) {
            return res.status(404).json({ message: `Asistencia con ID ${id} no encontrada.` });
        }
        res.status(200).json(asistencia);
    } catch (error) {
        console.error(`Error al obtener la asistencia con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al obtener la asistencia', error: error.message });
    }
};

// Actualizar el estado de una asistencia
export const updateAsistenciaEstado = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const asistencia = await Asistencia.obtenerPorId(id);
        if (!asistencia) {
            return res.status(404).json({ message: 'Asistencia no encontrada para actualizar' });
        }

        const updated = await asistencia.actualizarEstado(estado);
        if (updated) {
            res.status(200).json({ message: 'Estado de la asistencia actualizado exitosamente', asistencia });
        } else {
            res.status(500).json({ message: 'Error al actualizar el estado de la asistencia' });
        }
    } catch (error) {
        console.error(`Error al actualizar el estado de la asistencia con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al actualizar el estado de la asistencia', error: error.message });
    }
};

// Eliminar una asistencia
export const deleteAsistencia = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedId = await Asistencia.eliminar(id);
        if (deletedId) {
            res.status(200).json({ message: `Asistencia con ID ${deletedId} eliminada exitosamente` });
        } else {
            res.status(404).json({ message: 'Asistencia no encontrada para eliminar' });
        }
    } catch (error) {
        console.error(`Error al eliminar la asistencia con ID ${id}:`, error.message);
        res.status(500).json({ message: 'Error al eliminar la asistencia', error: error.message });
    }
};
