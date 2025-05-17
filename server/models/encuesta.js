import { execute, query } from '../utils/db.js';

class Encuesta {
  constructor(encuesta) {
    this.id = encuesta.id;
    this.titulo = encuesta.titulo;
    this.descripcion = encuesta.descripcion;
    this.fecha_inicio = encuesta.fecha_inicio;
    this.fecha_fin = encuesta.fecha_fin;
    this.estado = encuesta.estado;
  }

  // Crear una nueva encuesta
  static async crear(nuevaEncuesta) {
    try {
      const [result] = await execute(
        'INSERT INTO encuestas (titulo, descripcion, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?)',
        [
          nuevaEncuesta.titulo,
          nuevaEncuesta.descripcion,
          nuevaEncuesta.fecha_inicio,
          nuevaEncuesta.fecha_fin,
          nuevaEncuesta.estado || 'borrador'
        ]
      );

      // Obtener la encuesta recién insertada
      const [encuestaRows] = await execute('SELECT * FROM encuestas WHERE id = ?', [result.insertId]);
      
      if (encuestaRows.length === 0) {
        throw new Error('Encuesta no encontrada después de la inserción.');
      }

      return new Encuesta(encuestaRows[0]);
    } catch (error) {
      console.error('Error en Encuesta.crear:', error);
      throw error;
    }
  }

  // Obtener todas las encuestas
  static async obtenerTodos() {
    try {
      const encuestas = await query('SELECT * FROM encuestas');
      return encuestas.map(encuesta => new Encuesta(encuesta));
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  // Obtener una encuesta por ID
  static async obtenerPorId(id) {
    try {
      const [encuestas] = await execute('SELECT * FROM encuestas WHERE id = ?', [id]);
      if (encuestas.length === 0) return null;
      return new Encuesta(encuestas[0]);
    } catch (error) {
      console.error(`Error al obtener la encuesta con ID ${id}:`, error);
      throw error;
    }
  }

  static async obtenerPorFecha() {
    try {
      const encuestas = await query('SELECT * FROM encuestas WHERE fecha_fin >= CURDATE()');
      return encuestas.map(encuesta => new Encuesta(encuesta));
    } catch (error) {
      console.log('Error en Obtener por fechas', error);
      throw error;
    }
  }

  static async obtenerPorFechaEspecifica(fechaEspecifica) {
    try {
      const [encuestas] = await execute('SELECT * FROM encuestas WHERE fecha_fin >= ?', [fechaEspecifica]);
      return encuestas.map(encuesta => new Encuesta(encuesta));
    } catch (error) {
      console.log('Error en obtener por fecha especfica', error);
      throw error;
    }
  }

  // Actualizar una encuesta existente
  async actualizar() {
    try {
        const [result] = await execute(
            'UPDATE encuestas SET titulo = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE id = ?',
            [this.titulo, this.descripcion, this.fecha_inicio, this.fecha_fin, this.estado, this.id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        console.error(`Error al actualizar la encuesta con ID ${this.id}:`, error);
        throw error;
    }
  }

  // Eliminar una encuesta
  static async eliminar(id) {
    try {
        const [result] = await execute('DELETE FROM encuestas WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (error) {
        console.error(`Error al eliminar la encuesta con ID ${id}:`, error);
        throw error;
    }
  }
}

export default Encuesta;