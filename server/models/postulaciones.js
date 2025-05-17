import { execute, query } from '../utils/db.js';

class Postulacion {
  constructor(postulacion) {
    this.id = postulacion.id;
    this.egresado_id = postulacion.egresado_id;
    this.oferta_id = postulacion.oferta_id;
    this.estado_postulacion = postulacion.estado_postulacion;
    this.fecha_postulacion = postulacion.fecha_postulacion;
  }

  // Crear una nueva postulacion
  static async crear(nuevaPostulacion) {
    try {
      const [result] = await execute(
        'INSERT INTO postulaciones (egresado_id, oferta_id, estado_postulacion, fecha_postulacion) VALUES (?, ?, ?, ?)',
        [
          nuevaPostulacion.egresado_id,
          nuevaPostulacion.oferta_id,
          nuevaPostulacion.estado_postulacion,
          nuevaPostulacion.fecha_postulacion
        ]
      );

      const [postulacionRows] = await execute('SELECT * FROM postulaciones WHERE id = ?', [result.insertId]);

      if (postulacionRows.length === 0) {
        throw new Error('Postulación no encontrada después de la inserción.');
      }

      return new Postulacion(postulacionRows[0]);
    } catch (error) {
      console.error('Error en Postulacion.crear:', error);
      throw error;
    }
  }

  // Obtener todas las postuaciones de una oferta laboral
  static async obtenerPorOferta(oferta_id) {
    try {
      const queryStr = `
        SELECT 
          p.id AS postulacion_id,
          p.egresado_id,
          p.oferta_id,
          CONCAT(u.firstName, ' ', u.lastName) AS nombre_completo,
          u.email AS correo_usuario, -- Campo añadido para obtener el correo
          e.carrera AS carrera_egresado,
          e.telefono AS telefono_egresado, -- Campo añadido para obtener el teléfono
          p.estado_postulacion,
          p.fecha_postulacion
        FROM postulaciones p
        INNER JOIN egresados e ON p.egresado_id = e.id
        INNER JOIN users u ON e.user_id = u.id
        WHERE p.oferta_id = ?
      `;
      
      const postulaciones = await query(queryStr, [oferta_id]);
      return postulaciones;
    } catch (error) {
      console.error('Error en obtenerPorOferta en el model: ', error);
      throw error;
    }
  }

  // Obtener todas las postulaciones de un egresado
  static async obtenerPorEgresado(egresado_id) {
    try {
      const postulaciones = await query('SELECT * FROM postulaciones WHERE egresado_id = ?', [egresado_id]);
      return postulaciones.map(postulacion => new Postulacion(postulacion));
    } catch (error) {
      console.error('Error en obtenerPorEgresado:', error);
      throw error;
    }
  }

  // Obtener todas las postulaciones
  static async obtenerTodos() {
    try {
      const [postulaciones] = await execute('SELECT * FROM postulaciones');
      return postulaciones.map(postulacion => new Postulacion(postulacion));
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  // Obtener una postulacion específica por ID
  static async obtenerPorId(id) {
    const [postulaciones] = await execute('SELECT * FROM postulaciones WHERE id = ?', [id]);
    if (postulaciones.length === 0) return null;
    return new Postulacion(postulaciones[0]);
  }

  // Verificar si un egresado ya se postuló a una oferta
  static async verificarPostulacion(egresado_id, oferta_id) {
    try {
      const queryStr = 'SELECT * FROM postulaciones WHERE egresado_id = ? AND oferta_id = ?';
      const [result] = await execute(queryStr, [egresado_id, oferta_id]);

      // Retorna true si ya existe una postulación, de lo contrario false
      return result.length > 0;
    } catch (error) {
      console.error('Error en verificarPostulacion:', error);
      throw error;
    }
  }

  // Actualizar una postulacion existente
  async actualizar() {
    try {
      await execute(
        'UPDATE postulaciones SET estado_postulacion = ?, fecha_postulacion = ? WHERE id = ?',
        [this.estado_postulacion, this.fecha_postulacion, this.id]
      );
    } catch (error) {
      console.error('Error en Postulacion.actualizar:', error);
      throw error;
    }
  }

  // Eliminar una postulacion por ID
  async eliminar() {
    try {
      await execute('DELETE FROM postulaciones WHERE id = ?', [this.id]);
    } catch (error) {
      console.error('Error en Postulacion.eliminar:', error);
      throw error;
    }
  }
}

export default Postulacion;
