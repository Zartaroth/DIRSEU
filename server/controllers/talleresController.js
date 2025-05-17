import Taller from '../models/taller.js'; // Importa el modelo de Taller
import fs from 'fs/promises';
import sharp from 'sharp';
import path from 'path';
import os from 'os'; // Para obtener una carpeta temporal

// Crear un nuevo taller con imagen
export async function crearTaller(req, res) {
  try {
    const { nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo, codigo_instructor } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !descripcion || !fecha_inicio || !fecha_fin || !lugar || !cupo_maximo || !codigo_instructor ) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nuevoTallerData = {
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      lugar,
      cupo_maximo,
      imagen: req.file ? `/uploads/${req.file.filename}` : null,
      codigo_instructor
    };

    if (req.file) {
      const tempDir = os.tmpdir(); // Carpeta temporal del sistema
      const tempImagePath = path.join(tempDir, req.file.filename); // Mover imagen temporalmente

      // Mueve la imagen a la carpeta temporal
      await fs.rename(req.file.path, tempImagePath);

      const resizedImagePath = `uploads/resized-${req.file.filename}`; // Redimensionada

      // Procesar y redimensionar imagen
      await sharp(tempImagePath)
        .resize(800)
        .toFormat('webp')
        .jpeg({ quality: 80 })
        .toFile(resizedImagePath);

      // Intentar eliminar la imagen temporal
      try {
        await fs.unlink(tempImagePath);
      } catch (error) {
        console.error(`Error al eliminar la imagen temporal: ${tempImagePath}`, error);
      }

      nuevoTallerData.imagen = `/uploads/resized-${req.file.filename}`;
    }

    const nuevoTaller = await Taller.crear(nuevoTallerData);

    res.status(201).json(nuevoTaller);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el taller.' });
  }
}

// Obtener todos los talleres
export async function obtenerTalleres(req, res) {
  try {
    const talleres = await Taller.obtenerTodos();
    res.json(talleres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los talleres' });
  }
}

// Obtener todos los talleres por código de instructor
export async function obtenerTalleresPorCodigoInstructor(req, res) {
  try {
    const { codigo_instructor } = req.params;

    // Validar que el parámetro existe
    if (!codigo_instructor) {
      return res.status(400).json({ error: 'El código del instructor es obligatorio.' });
    }

    // Llamar al método de la clase Taller
    const talleres = await Taller.obtenerPorCodigoInstructor(codigo_instructor);

    // Verificar si se encontraron talleres
    if (talleres.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron talleres para este instructor.' });
    }

    // Devolver los talleres encontrados
    res.json(talleres);
  } catch (error) {
    console.error('Error en obtenerTalleresPorCodigoInstructor:', error.message);
    res.status(500).json({ error: 'Error al obtener los talleres del instructor.' });
  }
}

// Obtener un taller por ID
export async function obtenerTaller(req, res) {
  try {
    const taller = await Taller.obtenerPorId(req.params.id);
    if (taller) {
      res.json(taller);
    } else {
      res.status(404).json({ error: 'Taller no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el taller' });
  }
}

// Actualizar un taller con posibilidad de cambiar la imagen
export async function actualizarTaller(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo, codigo_instructor } = req.body;

    // Obtener el taller existente
    let taller = await Taller.obtenerPorId(id);
    if (!taller) {
      return res.status(404).json({ error: 'Taller no encontrado' });
    }

    // Actualizar los campos
    taller.nombre = nombre || taller.nombre;
    taller.descripcion = descripcion || taller.descripcion;
    taller.fecha_inicio = fecha_inicio || taller.fecha_inicio;
    taller.fecha_fin = fecha_fin || taller.fecha_fin;
    taller.lugar = lugar || taller.lugar;
    taller.cupo_maximo = cupo_maximo || taller.cupo_maximo;
    taller.codigo_instructor = codigo_instructor || taller.codigo_instructor;

    // Manejar la imagen si se subió una nueva
    if (req.file) {
      const nuevaImagenRuta = `/uploads/${req.file.filename}`;
      const antiguaImagenRuta = taller.imagen ? path.join('uploads', taller.imagen) : null;

      // Optimizar la nueva imagen
      const resizedImagePath = `uploads/resized-${req.file.filename}`;
      await sharp(req.file.path)
        .resize(800) // Redimensionar a 800px de ancho
        .toFormat('webp')
        .jpeg({ quality: 80 })
        .toFile(resizedImagePath);

      // Eliminar la imagen original
      await fs.unlink(req.file.path);

      // Actualizar la ruta de la imagen en el objeto
      taller.imagen = `/uploads/resized-${req.file.filename}`;

      // Eliminar la imagen antigua si existe
      if (antiguaImagenRuta) {
        try {
          await fs.unlink(antiguaImagenRuta);
          console.log('Imagen antigua eliminada:', antiguaImagenRuta);
        } catch (err) {
          console.error('Error al eliminar la imagen antigua:', err);
        }
      }
    }

    // Actualizar el taller en la base de datos
    await taller.actualizar();

    // Respuesta exitosa
    res.json(taller);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el taller' });
  }
}

// Eliminar un taller y su imagen
export async function eliminarTaller(req, res) {
  try {
    const { id } = req.params;

    // Obtener el taller existente
    const taller = await Taller.obtenerPorId(id);
    if (!taller) {
      return res.status(404).json({ error: 'Taller no encontrado' });
    }

    // Eliminar la imagen si existe
    if (taller.imagen) {
      const rutaImagen = path.join('uploads', taller.imagen); // Ruta completa de la imagen
      try {
        await fs.unlink(rutaImagen); // Intentar eliminar la imagen
        console.log('Imagen eliminada:', rutaImagen);
      } catch (err) {
        console.error('Error al eliminar la imagen:', err); // Manejar el error si la imagen no se puede eliminar
      }
    }

    // Eliminar el taller de la base de datos
    await taller.eliminar();

    // Respuesta exitosa
    res.json({ mensaje: 'Taller eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el taller' });
  }
}
