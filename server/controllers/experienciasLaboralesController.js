import ExperienciaLaboral from '../models/experienciasLaborales.js';

export const createExperienciaLaboral = async (req, res) => {
  try {
    const { id_egresado, empresa, puesto, descripcion, fecha_inicio, fecha_fin } = req.body;

    if (!id_egresado || !empresa || !puesto || !fecha_inicio) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }

    const nuevaExperiencia = await ExperienciaLaboral.crear({
      id_egresado,
      empresa,
      puesto,
      descripcion,
      fecha_inicio,
      fecha_fin,
    });

    res.status(201).json({ message: 'Experiencia laboral creada con éxito.', data: nuevaExperiencia });
  } catch (error) {
    console.error('Error al crear experiencia laboral:', error.message);
    res.status(500).json({ message: 'Error al crear experiencia laboral.', error: error.message });
  }
};

export const getAllExperiencias = async (req, res) => {
    try {
      const experiencias = await ExperienciaLaboral.obtenerTodos();
  
      if (!experiencias.length) {
        return res.status(404).json({ message: 'No hay experiencias laborales registradas.' });
      }
  
      res.status(200).json(experiencias);
    } catch (error) {
      console.error('Error al obtener todas las experiencias laborales:', error.message);
      res.status(500).json({ message: 'Error al obtener todas las experiencias laborales.', error: error.message });
    }
};

export const getExperienciasByEgresado = async (req, res) => {
  try {
    const { id_egresado } = req.params;
    const experiencias = await ExperienciaLaboral.obtenerPorEgresado(id_egresado);

    // Si no se encuentran experiencias, devuelve un mensaje específico
    if (experiencias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron experiencias laborales para este egresado.' });
    }

    // Si se encontraron experiencias, las devuelve
    res.status(200).json(experiencias);
  } catch (error) {
    console.error('Error al obtener experiencias laborales:', error.message);
    res.status(500).json({ message: 'Error al obtener experiencias laborales.', error: error.message });
  }
};

export const getExperienciaById = async (req, res) => {
  try {
    const { id } = req.params;

    const experiencia = await ExperienciaLaboral.obtenerPorId(id);

    if (!experiencia) {
      return res.status(404).json({ message: 'Experiencia laboral no encontrada.' });
    }

    res.status(200).json(experiencia);
  } catch (error) {
    console.error('Error al obtener experiencia laboral:', error.message);
    res.status(500).json({ message: 'Error al obtener experiencia laboral.', error: error.message });
  }
};

export const updateExperienciaLaboral = async (req, res) => {
  try {
    const { id } = req.params;
    const { empresa, puesto, descripcion, fecha_inicio, fecha_fin } = req.body;

    const experiencia = await ExperienciaLaboral.obtenerPorId(id);

    if (!experiencia) {
      return res.status(404).json({ message: 'Experiencia laboral no encontrada.' });
    }

    experiencia.empresa = empresa || experiencia.empresa;
    experiencia.puesto = puesto || experiencia.puesto;
    experiencia.descripcion = descripcion || experiencia.descripcion;
    experiencia.fecha_inicio = fecha_inicio || experiencia.fecha_inicio;
    experiencia.fecha_fin = fecha_fin || experiencia.fecha_fin;

    const experienciaActualizada = await experiencia.actualizar();
    res.status(200).json({ message: 'Experiencia laboral actualizada con éxito.', data: experienciaActualizada });
  } catch (error) {
    console.error('Error al actualizar experiencia laboral:', error.message);
    res.status(500).json({ message: 'Error al actualizar experiencia laboral.', error: error.message });
  }
};

export const deleteExperienciaLaboral = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedId = await ExperienciaLaboral.eliminar(id);

    res.status(200).json({ message: 'Experiencia laboral eliminada con éxito.', id: deletedId });
  } catch (error) {
    console.error('Error al eliminar experiencia laboral:', error.message);
    res.status(500).json({ message: 'Error al eliminar experiencia laboral.', error: error.message });
  }
};
