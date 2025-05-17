import Voluntariado from '../models/voluntariado.js';
import fs from 'fs/promises';
import sharp from 'sharp';
import path from 'path';
import os from 'os'; // Para obtener una carpeta temporal

// Crear un nuevo voluntariado con imagen
export async function crearVoluntariado(req, res) {
  try {
    const { nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo } = req.body;

    // Validar que todos los campos estén presentes
    if (!nombre || !descripcion || !fecha_inicio || !fecha_fin || !lugar || !cupo_maximo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nuevoVoluntariadoData = {
      nombre,
      descripcion,
      fecha_inicio,
      fecha_fin,
      lugar,
      cupo_maximo,
      imagen: req.file ? `/uploads/${req.file.filename}` : null
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

      nuevoVoluntariadoData.imagen = `/uploads/resized-${req.file.filename}`;
    }

    const nuevoVoluntariado = await Voluntariado.crear(nuevoVoluntariadoData);

    res.status(201).json(nuevoVoluntariado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el voluntariado.' });
  }
}

// Obtener todos los voluntariados
export async function obtenerVoluntariados(req, res) {
  try {
    const voluntariados = await Voluntariado.obtenerTodos();
    res.json(voluntariados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los voluntariados' });
  }
}

// Obtener un voluntariado por ID
export async function obtenerVoluntariado(req, res) {
  try {
    const voluntariado = await Voluntariado.obtenerPorId(req.params.id);
    if (voluntariado) {
      res.json(voluntariado);
    } else {
      res.status(404).json({ error: 'Voluntariado no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el voluntariado' });
  }
}

// Actualizar un voluntariado con posibilidad de cambiar la imagen
export async function actualizarVoluntariado(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo } = req.body;

    // Obtener el voluntariado existente
    let voluntariado = await Voluntariado.obtenerPorId(id);
    if (!voluntariado) {
      return res.status(404).json({ error: 'Voluntariado no encontrado' });
    }

    // Actualizar los campos del voluntariado
    voluntariado.nombre = nombre || voluntariado.nombre;
    voluntariado.descripcion = descripcion || voluntariado.descripcion;
    voluntariado.fecha_inicio = fecha_inicio || voluntariado.fecha_inicio;
    voluntariado.fecha_fin = fecha_fin || voluntariado.fecha_fin;
    voluntariado.lugar = lugar || voluntariado.lugar;
    voluntariado.cupo_maximo = cupo_maximo || voluntariado.cupo_maximo;

    // Verificar si se ha subido una nueva imagen
    if (req.file) {
      console.log('Archivo recibido:', req.file); // Verificar que se recibe la imagen correctamente

      // Ruta de la nueva imagen
      const nuevaImagenRuta = `/uploads/actualizado-${req.file.filename}`;
      const resizedImagePath = `uploads/actualizado-${req.file.filename}`;

      // Eliminar la imagen anterior si existe
      if (voluntariado.imagen) {
        const imagenAntiguaRuta = path.join('uploads', voluntariado.imagen);
        try {
          await fs.unlink(imagenAntiguaRuta);
          console.log('Imagen anterior eliminada:', imagenAntiguaRuta);
        } catch (err) {
          console.error('Error al eliminar la imagen anterior:', err);
        }
      }

      // Procesar la nueva imagen (redimensionar y optimizar)
      await sharp(req.file.path)
        .resize(800)
        .toFormat('webp')
        .webp({ quality: 80 })
        .toFile(resizedImagePath);

      // Actualizar la ruta de la imagen en la base de datos
      voluntariado.imagen = nuevaImagenRuta;

      console.log('Ruta de la imagen actualizada en la base de datos:', voluntariado.imagen);
    }

    // Guardar los cambios en la base de datos
    await voluntariado.actualizar();

    // Enviar respuesta exitosa con los datos actualizados
    res.json(voluntariado);
  } catch (error) {
    console.error('Error al actualizar el voluntariado:', error);
    res.status(500).json({ error: 'Error al actualizar el voluntariado.' });
  }
}

// Eliminar un voluntariado y su imagen
export async function eliminarVoluntariado(req, res) {
  try {
    const { id } = req.params;

    // Obtener el voluntariado existente
    const voluntariado = await Voluntariado.obtenerPorId(id);
    if (!voluntariado) {
      return res.status(404).json({ error: 'Voluntariado no encontrado' });
    }

    // Eliminar la imagen si existe
    if (voluntariado.imagen) {
      const rutaImagen = path.join('uploads', voluntariado.imagen);
      try {
        await fs.unlink(rutaImagen);
        console.log('Imagen eliminada:', rutaImagen);
      } catch (err) {
        console.error('Error al eliminar la imagen:', err);
      }
    }

    // Eliminar el voluntariado de la base de datos
    await voluntariado.eliminar();

    // Respuesta exitosa
    res.json({ mensaje: 'Voluntariado eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el voluntariado:', error);
    res.status(500).json({ error: 'Error al eliminar el voluntariado.' });
  }
}
