import { execute, query } from '../utils/db.js';

class Pregunta {
  constructor(pregunta) {
    this.id = pregunta.id;
    this.encuesta_id = pregunta.encuesta_id;
    this.texto = pregunta.texto;
    this.tipo = pregunta.tipo;
  }

  // Crear una nueva pregunta
  static async crear(nuevaPregunta) {
    try {
        const [result] = await execute(
            'INSERT INTO preguntas (encuesta_id, texto, tipo) VALUES (?, ?, ?)',
            [nuevaPregunta.encuesta_id, nuevaPregunta.texto, nuevaPregunta.tipo]
        );

        // Verifica que se haya insertado correctamente
        if (result.insertId) {
            const [preguntaRows] = await execute('SELECT * FROM preguntas WHERE id = ?', [result.insertId]);

            if (preguntaRows.length === 0) {
                throw new Error('Pregunta no encontrada después de la inserción.');
            }

            // Regresar una nueva instancia de la clase Pregunta con el ID insertado
            return new Pregunta(preguntaRows[0]);
        } else {
            throw new Error('Error al insertar la pregunta');
        }
    } catch (error) {
        console.error('Error en Pregunta.crear:', error);
        throw error;
    }
  }
  // Obtener todas las preguntas de una encuesta específica, incluyendo sus opciones
  static async obtenerPorEncuestaId(encuestaId) {
    try {
      // Consulta para obtener preguntas y opciones
      const rows = await query(`
        SELECT 
          p.id AS pregunta_id, 
          p.texto AS pregunta_texto, 
          p.tipo AS pregunta_tipo, 
          o.id AS opcion_id, 
          o.texto AS opcion_texto
        FROM preguntas p
        LEFT JOIN opciones_preguntas o ON p.id = o.pregunta_id
        WHERE p.encuesta_id = ?;
      `, [encuestaId]);

      // Agrupar preguntas y sus opciones
      const preguntasMap = new Map();

      rows.forEach(row => {
        if (!preguntasMap.has(row.pregunta_id)) {
          preguntasMap.set(row.pregunta_id, {
            id: row.pregunta_id,
            texto: row.pregunta_texto,
            tipo: row.pregunta_tipo,
            opciones: []
          });
        }

        if (row.opcion_id) {
          preguntasMap.get(row.pregunta_id).opciones.push({
            id: row.opcion_id,
            texto: row.opcion_texto
          });
        }
      });

      return Array.from(preguntasMap.values());
    } catch (error) {
      console.error(`Error al obtener preguntas para la encuesta con ID ${encuestaId}:`, error);
      throw error;
    }
  }

  // Obtener una pregunta específica por su ID, incluyendo sus opciones
  static async obtenerPorId(id) {
    try {
      const rows = await query(`
        SELECT 
          p.id AS pregunta_id, 
          p.texto AS pregunta_texto, 
          p.tipo AS pregunta_tipo, 
          o.id AS opcion_id, 
          o.texto AS opcion_texto
        FROM preguntas p
        LEFT JOIN opciones_preguntas o ON p.id = o.id_pregunta
        WHERE p.id = ?
      `, [id]);

      if (rows.length === 0) return null;

      const pregunta = {
        id: rows[0].pregunta_id,
        texto: rows[0].pregunta_texto,
        tipo: rows[0].pregunta_tipo,
        opciones: []
      };

      rows.forEach(row => {
        if (row.opcion_id) {
          pregunta.opciones.push({
            id: row.opcion_id,
            texto: row.opcion_texto
          });
        }
      });

      return pregunta;
    } catch (error) {
      console.error(`Error al obtener la pregunta con ID ${id}:`, error);
      throw error;
    }
  }

  // Actualizar una pregunta existente
  async actualizar() {
    try {
      const [result] = await execute(
        'UPDATE preguntas SET texto = ?, tipo = ? WHERE id = ?',
        [this.texto, this.tipo, this.id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al actualizar la pregunta con ID ${this.id}:`, error);
      throw error;
    }
  }

  // Eliminar una pregunta
  static async eliminar(id) {
    try {
        const [result] = await execute('DELETE FROM preguntas WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            return id;  // Retorna el ID de la pregunta eliminada
        } else {
            throw new Error('Pregunta no encontrada para eliminar');
        }
    } catch (error) {
        console.error(`Error al eliminar la pregunta con ID ${id}:`, error);
        throw error;
    }
  }
}

export default Pregunta;
