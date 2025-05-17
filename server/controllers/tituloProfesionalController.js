import TituloProfesional from '../models/tituloProfesional.js';

export const createTituloProfesional = async (req, res) => {
  try {
    const { id_egresado, titulo, fecha_sustentacion, modalidad_obtencion, fecha_obtencion, nro_resolucion } = req.body;

    if (!id_egresado || !titulo || !fecha_sustentacion || !modalidad_obtencion || !fecha_obtencion || !nro_resolucion) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }

    const nuevoTitulo = await TituloProfesional.crear({
      id_egresado,
      titulo,
      fecha_sustentacion,
      modalidad_obtencion,
      fecha_obtencion,
      nro_resolucion,
    });

    res.status(201).json({ message: 'Título profesional creado con éxito.' });
  } catch (error) {
    console.error('Error al crear título profesional:', error.message);
    res.status(500).json({ message: 'Error al crear título profesional.', error: error.message });
  }
};

export const getAllTitulosProfesionales = async (req, res) => {
  try {
    const titulos = await TituloProfesional.obtenerTodos();

    if (!titulos.length) {
      return res.status(404).json({ message: 'No hay registros de títulos profesionales.' });
    }

    res.status(200).json(titulos);
  } catch (error) {
    console.error('Error al obtener todos los títulos profesionales:', error.message);
    res.status(500).json({ message: 'Error al obtener todos los títulos profesionales.', error: error.message });
  }
};

export const getTituloByEgresado = async (req, res) => {
  try {
    const { id_egresado } = req.params;
    const titulo = await TituloProfesional.obtenerPorEgresado(id_egresado);

    if (!titulo) {
      return res.status(200).json(null); // Enviar null si no hay título registrado
    }

    res.status(200).json(titulo);
  } catch (error) {
    console.error('Error al obtener título profesional:', error.message);
    res.status(500).json({ message: 'Error al obtener título profesional.', error: error.message });
  }
};

export const getTituloById = async (req, res) => {
  try {
    const { id } = req.params;
    const titulo = await TituloProfesional.obtenerPorId(id);

    if (!titulo) {
      return res.status(404).json({ message: 'Registro de título profesional no encontrado.' });
    }

    res.status(200).json(titulo);
  } catch (error) {
    console.error('Error al obtener título profesional:', error.message);
    res.status(500).json({ message: 'Error al obtener título profesional.', error: error.message });
  }
};

export const updateTituloProfesional = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, fecha_sustentacion, modalidad_obtencion, fecha_obtencion, nro_resolucion } = req.body;

    const tituloProfesional = await TituloProfesional.obtenerPorId(id);

    if (!tituloProfesional) {
      return res.status(404).json({ message: 'Registro de título profesional no encontrado.' });
    }

    // Actualizar solo los campos proporcionados
    tituloProfesional.titulo = titulo || tituloProfesional.titulo;
    tituloProfesional.fecha_sustentacion = fecha_sustentacion || tituloProfesional.fecha_sustentacion;
    tituloProfesional.modalidad_obtencion = modalidad_obtencion || tituloProfesional.modalidad_obtencion;
    tituloProfesional.fecha_obtencion = fecha_obtencion || tituloProfesional.fecha_obtencion;
    tituloProfesional.nro_resolucion = nro_resolucion || tituloProfesional.nro_resolucion;

    console.log("Datos enviados para actualización:", tituloProfesional);

    const tituloActualizado = await tituloProfesional.actualizar();

    res.status(200).json({ message: 'Título profesional actualizado con éxito.', data: tituloActualizado });
  } catch (error) {
    console.error('Error al actualizar título profesional:', error.message);
    res.status(500).json({ message: 'Error al actualizar título profesional.', error: error.message });
  }
};

export const deleteTituloProfesional = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedId = await TituloProfesional.eliminar(id);

    res.status(200).json({ message: 'Registro de título profesional eliminado con éxito.', id: deletedId });
  } catch (error) {
    console.error('Error al eliminar título profesional:', error.message);
    res.status(500).json({ message: 'Error al eliminar título profesional.', error: error.message });
  }
};
