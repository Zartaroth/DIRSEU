import { execute, query } from '../utils/db.js';

class OpcionPregunta {
  constructor(opcionPregunta) {
    this.id = opcionPregunta.id;
    this.pregunta_id = opcionPregunta.pregunta_id;
    this.texto = opcionPregunta.texto;
  }

  // Crear una nueva opción de pregunta
  static async crear(nuevaOpcionPregunta) {
    try {
      const [result] = await execute(
        'INSERT INTO opciones_preguntas (pregunta_id, texto) VALUES (?, ?)',
        [nuevaOpcionPregunta.pregunta_id, nuevaOpcionPregunta.texto]
      );

      // Verifica que se haya insertado correctamente
      if (result.insertId) {
        const [opcionPreguntaRows] = await execute(
          'SELECT * FROM opciones_preguntas WHERE id = ?',
          [result.insertId]
        );

        if (opcionPreguntaRows.length === 0) {
          throw new Error('Opción de pregunta no encontrada después de la inserción.');
        }

        // Regresar una nueva instancia de la clase OpcionPregunta con el ID insertado
        return new OpcionPregunta(opcionPreguntaRows[0]);
      } else {
        throw new Error('Error al insertar la opción de pregunta');
      }
    } catch (error) {
      console.error('Error en OpcionPregunta.crear:', error);
      throw error;
    }
  }

  // Obtener todas las opciones de una pregunta específica
  static async obtenerPorPreguntaId(preguntaId) {
    try {
      const opciones = await query(
        'SELECT * FROM opciones_preguntas WHERE pregunta_id = ?',
        [preguntaId]
      );
      return opciones.map(opcion => new OpcionPregunta(opcion));
    } catch (error) {
      console.error(`Error al obtener opciones para la pregunta con ID ${preguntaId}:`, error);
      throw error;
    }
  }

  // Obtener una opción de pregunta por su ID
  static async obtenerPorId(id) {
    try {
      const [opcionPreguntaRows] = await execute(
        'SELECT * FROM opciones_preguntas WHERE id = ?',
        [id]
      );
      if (opcionPreguntaRows.length === 0) return null;
      return new OpcionPregunta(opcionPreguntaRows[0]);
    } catch (error) {
      console.error(`Error al obtener la opción de pregunta con ID ${id}:`, error);
      throw error;
    }
  }

  // Actualizar una opción de pregunta existente
  async actualizar() {
    try {
      const [result] = await execute(
        'UPDATE opciones_preguntas SET texto = ? WHERE id = ?',
        [this.texto, this.id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al actualizar la opción de pregunta con ID ${this.id}:`, error);
      throw error;
    }
  }

  // Eliminar una opción de pregunta
  static async eliminar(id) {
    try {
      const [result] = await execute('DELETE FROM opciones_preguntas WHERE id = ?', [id]);
      if (result.affectedRows > 0) {
        return id; // Retorna el ID de la opción de pregunta eliminada
      } else {
        throw new Error('Opción de pregunta no encontrada para eliminar');
      }
    } catch (error) {
      console.error(`Error al eliminar la opción de pregunta con ID ${id}:`, error);
      throw error;
    }
  }
}

export default OpcionPregunta;
