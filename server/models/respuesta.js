import { execute, query } from '../utils/db.js';

class Respuesta {
  constructor(respuesta) {
    this.id = respuesta.id;
    this.encuesta_id = respuesta.encuesta_id;
    this.usuario_id = respuesta.usuario_id;
    this.fecha_respuesta = respuesta.fecha_respuesta;
    this.pregunta_id = respuesta.pregunta_id;
    this.respuesta = respuesta.respuesta;
  }

  // Crear una nueva respuesta
  static async crear(nuevaRespuesta) {
    try {
      const [result] = await execute(
        `INSERT INTO respuestas (encuesta_id, usuario_id, fecha_respuesta, pregunta_id, respuesta) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          nuevaRespuesta.encuesta_id,
          nuevaRespuesta.usuario_id, // Puede ser opcional
          nuevaRespuesta.fecha_respuesta || new Date(), // Si no se proporciona, usa la fecha actual
          nuevaRespuesta.pregunta_id,
          nuevaRespuesta.respuesta,
        ]
      );

      // Obtener la respuesta recién insertada
      const [respuestaRows] = await execute('SELECT * FROM respuestas WHERE id = ?', [result.insertId]);

      if (respuestaRows.length === 0) {
        throw new Error('Respuesta no encontrada después de la inserción.');
      }

      return new Respuesta(respuestaRows[0]);
    } catch (error) {
      console.error('Error en Respuesta.crear:', error);
      throw error;
    }
  }

  // Obtener todas las respuestas de una encuesta
  static async obtenerPorEncuesta(encuesta_id) {
    try {
      const [rows] = await execute(
        `
        SELECT 
          p.texto AS pregunta,
          p.tipo AS tipo_pregunta,
          CONCAT(u.firstName, ' ', u.lastName) AS usuario,
          r.respuesta,
          r.pregunta_id
        FROM respuestas r
        JOIN preguntas p ON r.pregunta_id = p.id
        JOIN users u ON r.usuario_id = u.id
        WHERE r.encuesta_id = ?
        `,
        [encuesta_id]
      );
  
      // Agrupar respuestas por pregunta con tipo_pregunta
      const respuestasAgrupadas = rows.reduce((acc, row) => {
        const { pregunta, tipo_pregunta, respuesta, usuario } = row;
        const existingPregunta = acc.find((item) => item.pregunta === pregunta);
  
        if (existingPregunta) {
          existingPregunta.respuestas.push({ respuesta, usuario });
        } else {
          acc.push({
            pregunta,
            tipo: tipo_pregunta, // Agregar tipo de pregunta al grupo
            respuestas: [{ respuesta, usuario }],
          });
        }
  
        return acc;
      }, []);
  
      return respuestasAgrupadas;
    } catch (error) {
      console.error(`Error al obtener las respuestas de la encuesta con ID ${encuesta_id}:`, error);
      throw error;
    }
  }
  

  // Obtener todas las respuestas de una pregunta específica
  static async obtenerPorPregunta(pregunta_id) {
    try {
      const [respuestas] = await execute(
        `SELECT * FROM respuestas WHERE pregunta_id = ?`,
        [pregunta_id]
      );

      return respuestas.map(respuesta => new Respuesta(respuesta));
    } catch (error) {
      console.error(`Error al obtener las respuestas de la pregunta con ID ${pregunta_id}:`, error);
      throw error;
    }
  }

  // Obtener una respuesta específica por ID
  static async obtenerPorId(id) {
    try {
      const [respuestas] = await execute('SELECT * FROM respuestas WHERE id = ?', [id]);

      if (respuestas.length === 0) return null;

      return new Respuesta(respuestas[0]);
    } catch (error) {
      console.error(`Error al obtener la respuesta con ID ${id}:`, error);
      throw error;
    }
  }

  // Actualizar una respuesta existente
  async actualizar() {
    try {
      const [result] = await execute(
        `UPDATE respuestas 
         SET encuesta_id = ?, usuario_id = ?, fecha_respuesta = ?, pregunta_id = ?, respuesta = ? 
         WHERE id = ?`,
        [
          this.encuesta_id,
          this.usuario_id || null,
          this.fecha_respuesta || new Date(), // Actualizar a la fecha actual si no se proporciona
          this.pregunta_id,
          this.respuesta,
          this.id,
        ]
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al actualizar la respuesta con ID ${this.id}:`, error);
      throw error;
    }
  }

  // Eliminar una respuesta
  static async eliminar(id) {
    try {
      const [result] = await execute('DELETE FROM respuestas WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al eliminar la respuesta con ID ${id}:`, error);
      throw error;
    }
  }
}

export default Respuesta;
