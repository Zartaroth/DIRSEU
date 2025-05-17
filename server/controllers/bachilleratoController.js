import Bachillerato from '../models/bachillerato.js';

export const createBachillerato = async (req, res) => {
  try {
    const { id_egresado, tipo, fecha_inicio, fecha_fin, fecha_obtencion, nro_resolucion } = req.body;

    if (!id_egresado || !tipo || !fecha_inicio || !fecha_obtencion || !nro_resolucion) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }

    const nuevoBachillerato = await Bachillerato.crear({
      id_egresado,
      tipo,
      fecha_inicio,
      fecha_fin,
      fecha_obtencion,
      nro_resolucion,
    });

    res.status(201).json({ message: 'Bachillerato creado con éxito.', data: nuevoBachillerato });
  } catch (error) {
    console.error('Error al crear bachillerato:', error.message);
    res.status(500).json({ message: 'Error al crear bachillerato.', error: error.message });
  }
};

export const getAllBachilleratos = async (req, res) => {
  try {
    const bachilleratos = await Bachillerato.obtenerTodos();

    if (!bachilleratos.length) {
      return res.status(404).json({ message: 'No hay registros de bachillerato.' });
    }

    res.status(200).json(bachilleratos);
  } catch (error) {
    console.error('Error al obtener todos los bachilleratos:', error.message);
    res.status(500).json({ message: 'Error al obtener todos los bachilleratos.', error: error.message });
  }
};

export const getBachilleratoByEgresado = async (req, res) => {
  try {
    const { id_egresado } = req.params;
    const bachillerato = await Bachillerato.obtenerPorEgresado(id_egresado);

    if (!bachillerato) {
      return res.status(200).json(null); // Enviar null si no hay bachillerato registrado
    }

    res.status(200).json(bachillerato);
  } catch (error) {
    console.error('Error al obtener bachillerato:', error.message);
    res.status(500).json({ message: 'Error al obtener bachillerato.', error: error.message });
  }
};

export const getBachilleratoById = async (req, res) => {
  try {
    const { id } = req.params;
    const bachillerato = await Bachillerato.obtenerPorId(id);

    if (!bachillerato) {
      return res.status(404).json({ message: 'Registro de bachillerato no encontrado.' });
    }

    res.status(200).json(bachillerato);
  } catch (error) {
    console.error('Error al obtener bachillerato:', error.message);
    res.status(500).json({ message: 'Error al obtener bachillerato.', error: error.message });
  }
};

export const updateBachillerato = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, fecha_inicio, fecha_fin, fecha_obtencion, nro_resolucion } = req.body;

    const bachillerato = await Bachillerato.obtenerPorId(id);

    if (!bachillerato) {
      return res.status(404).json({ message: 'Registro de bachillerato no encontrado.' });
    }

    bachillerato.tipo = tipo || bachillerato.tipo;
    bachillerato.fecha_inicio = fecha_inicio || bachillerato.fecha_inicio;
    bachillerato.fecha_fin = fecha_fin || bachillerato.fecha_fin;
    bachillerato.fecha_obtencion = fecha_obtencion || bachillerato.fecha_obtencion;
    bachillerato.nro_resolucion = nro_resolucion || bachillerato.nro_resolucion;

    const bachilleratoActualizado = await bachillerato.actualizar();
    res.status(200).json({ message: 'Bachillerato actualizado con éxito.', data: bachilleratoActualizado });
  } catch (error) {
    console.error('Error al actualizar bachillerato:', error.message);
    res.status(500).json({ message: 'Error al actualizar bachillerato.', error: error.message });
  }
};

export const deleteBachillerato = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedId = await Bachillerato.eliminar(id);

    res.status(200).json({ message: 'Registro de bachillerato eliminado con éxito.', id: deletedId });
  } catch (error) {
    console.error('Error al eliminar bachillerato:', error.message);
    res.status(500).json({ message: 'Error al eliminar bachillerato.', error: error.message });
  }
};
