import Evento from '../models/evento.js';
import { promises as fs } from 'fs';
import sharp from 'sharp';
import path from 'path';
import os from 'os'; 

// Crear un nuevo evento con imagen
export async function crearEvento(req, res) {
  try {
    const { nombre, descripcion, fecha, hora, lugar, codigo_coordinador } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (!nombre || !descripcion || !fecha || !hora || !lugar || !codigo_coordinador) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Verificar que 'lugar' no esté vacío o nulo
    if (!lugar || lugar.trim() === '') {
      return res.status(400).json({ error: 'El campo "lugar" no puede estar vacío.' });
    }

    const nuevoEventoData = {
      nombre,
      descripcion,
      fecha,
      hora,
      lugar,  // Asegúrate de que este valor no sea null
      codigo_coordinador,
      imagen: req.file ? `/uploads/${req.file.filename}` : null,
    };

    // No redimensionar la imagen
    if (req.file) {
      // No se realiza ningún cambio en la imagen, solo se guarda con el nombre original
      nuevoEventoData.imagen = `/uploads/${req.file.filename}`;
    }

    // Crear el evento en la base de datos
    const nuevoEvento = await Evento.crear(nuevoEventoData);
    res.status(201).json(nuevoEvento);
  } catch (error) {
    console.error('Error al crear el evento:', error);
    res.status(500).json({ error: 'Error al crear el evento.' });
  }
}

// Obtener todos los eventos
export async function obtenerEventos(req, res) {
  try {
    const eventos = await Evento.obtenerTodos();
    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los eventos.' });
  }
}

// Obtener un evento por ID
export async function obtenerEvento(req, res) {
  try {
    const evento = await Evento.obtenerPorId(req.params.id);
    if (evento) {
      res.json(evento);
    } else {
      res.status(404).json({ error: 'Evento no encontrado.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el evento.' });
  }
}

// Obtener eventos por código de coordinador
export async function obtenerEventosPorCoordinador(req, res) {
  try {
    const codigoCoordinador = req.params.codigo_coordinador; // Obtener el código de coordinador de los parámetros
    const eventos = await Evento.obtenerPorCodigoCoordinador(codigoCoordinador);

    if (eventos.length === 0) {
      return res.status(404).json({ error: 'No se encontraron eventos para este coordinador.' });
    }

    res.json(eventos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los eventos por coordinador.' });
  }
}

// Actualizar un evento con posibilidad de cambiar la imagen
export async function actualizarEvento(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, fecha, hora, lugar, codigo_coordinador } = req.body;

    // Obtener el evento existente
    let evento = await Evento.obtenerPorId(id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado.' });
    }

    // Actualizar los campos
    evento.nombre = nombre || evento.nombre;
    evento.descripcion = descripcion || evento.descripcion;
    evento.fecha = fecha || evento.fecha;
    evento.hora = hora || evento.hora;
    evento.lugar = lugar || evento.lugar;
    evento.codigo_coordinador = codigo_coordinador || evento.codigo_coordinador;

    // Manejar la imagen si se subió una nueva
    if (req.file) {
      const nuevaImagenRuta = `uploads/resized-${req.file.filename}`;
      const antiguaImagenRuta = evento.imagen ? path.join('uploads', path.basename(evento.imagen)) : null;

      // Redimensionar la nueva imagen
      await sharp(req.file.path)
        .resize(800)
        .toFormat('webp')
        .webp({ quality: 80 })
        .toFile(nuevaImagenRuta);

      // Eliminar la imagen temporal original
      await fs.unlink(req.file.path);

      // Eliminar la imagen antigua si existe
      if (antiguaImagenRuta) {
        try {
          await fs.unlink(antiguaImagenRuta);
        } catch (err) {
          console.error('Error al eliminar la imagen antigua:', err);
        }
      }

      // Actualizar la ruta de la imagen
      evento.imagen = `/uploads/resized-${req.file.filename}`;
    }

    // Actualizar el evento en la base de datos
    await evento.actualizar();

    res.json(evento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el evento.' });
  }
}

// Eliminar un evento y su imagen
export async function eliminarEvento(req, res) {
  try {
    const { id } = req.params;

    // Obtener el evento existente
    const evento = await Evento.obtenerPorId(id);
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado.' });
    }

    // Eliminar la imagen si existe
    if (evento.imagen) {
      const rutaImagen = path.join('.', evento.imagen); // Usamos la ruta directamente desde la base de datos
      // Verificar si la imagen existe
      const existeImagen = await fs.access(rutaImagen).then(() => true).catch(() => false);
    
      if (existeImagen) {
        try {
          await fs.unlink(rutaImagen);
        } catch (err) {
          console.error('Error al eliminar la imagen:', err);
        }
      } else {
        console.warn(`La imagen no existe en la ruta: ${rutaImagen}`);
      }
    }

    // Eliminar el evento de la base de datos
    await evento.eliminar();

    res.json({ mensaje: 'Evento eliminado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el evento.' });
  }
}
