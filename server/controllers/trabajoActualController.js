import EmpleoActual from '../models/trabajoActual.js';

export const createEmpleoActual = async (req, res) => {
  try {
    const { id_egresado, cargo_laboral, institucion, area, grado_universitario, fecha_inicio } = req.body;

    if (!id_egresado || !cargo_laboral || !institucion || !area || !grado_universitario || !fecha_inicio) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }

    const nuevoEmpleo = await EmpleoActual.crear({
      id_egresado,
      cargo_laboral,
      institucion,
      area,
      grado_universitario,
      fecha_inicio,
    });

    res.status(201).json({ message: 'Empleo actual creado con éxito.' });
  } catch (error) {
    console.error('Error al crear empleo actual:', error.message);
    res.status(500).json({ message: 'Error al crear empleo actual.', error: error.message });
  }
};

export const getAllEmpleosActuales = async (req, res) => {
  try {
    const empleos = await EmpleoActual.obtenerTodos();

    if (!empleos.length) {
      return res.status(404).json({ message: 'No hay registros de empleos actuales.' });
    }

    res.status(200).json(empleos);
  } catch (error) {
    console.error('Error al obtener todos los empleos actuales:', error.message);
    res.status(500).json({ message: 'Error al obtener todos los empleos actuales.', error: error.message });
  }
};

export const getEmpleoByEgresado = async (req, res) => {
    try {
      const { id_egresado } = req.params;
      const empleo = await EmpleoActual.obtenerPorEgresado(id_egresado);
  
      if (!empleo) {
        return res.status(200).json(null); // Enviar null si no hay empleo registrado
      }
  
      res.status(200).json(empleo);
    } catch (error) {
      console.error('Error al obtener empleo actual:', error.message);
      res.status(500).json({ message: 'Error al obtener empleo actual.', error: error.message });
    }
};

export const getEmpleoById = async (req, res) => {
  try {
    const { id } = req.params;
    const empleo = await EmpleoActual.obtenerPorId(id);

    if (!empleo) {
      return res.status(404).json({ message: 'Registro de empleo actual no encontrado.' });
    }

    res.status(200).json(empleo);
  } catch (error) {
    console.error('Error al obtener empleo actual:', error.message);
    res.status(500).json({ message: 'Error al obtener empleo actual.', error: error.message });
  }
};

export const updateEmpleoActual = async (req, res) => {
  try {
    const { id } = req.params;
    const { cargo_laboral, institucion, area, grado_universitario, fecha_inicio } = req.body;

    const empleoActual = await EmpleoActual.obtenerPorId(id);

    if (!empleoActual) {
      return res.status(404).json({ message: 'Registro de empleo actual no encontrado.' });
    }

    // Actualizar solo los campos proporcionados
    empleoActual.cargo_laboral = cargo_laboral || empleoActual.cargo_laboral;
    empleoActual.institucion = institucion || empleoActual.institucion;
    empleoActual.area = area || empleoActual.area;
    empleoActual.grado_universitario = grado_universitario || empleoActual.grado_universitario;
    empleoActual.fecha_inicio = fecha_inicio || empleoActual.fecha_inicio;

    console.log("Datos enviados para actualización:", empleoActual);

    const empleoActualizado = await empleoActual.actualizar();

    res.status(200).json({ message: 'Empleo actual actualizado con éxito.', data: empleoActualizado });
  } catch (error) {
    console.error('Error al actualizar empleo actual:', error.message);
    res.status(500).json({ message: 'Error al actualizar empleo actual.', error: error.message });
  }
};

export const deleteEmpleoActual = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedId = await EmpleoActual.eliminar(id);

    res.status(200).json({ message: 'Registro de empleo actual eliminado con éxito.', id: deletedId });
  } catch (error) {
    console.error('Error al eliminar empleo actual:', error.message);
    res.status(500).json({ message: 'Error al eliminar empleo actual.', error: error.message });
  }
};
