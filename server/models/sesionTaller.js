import { execute, query } from '../utils/db.js';

class SesionTaller {
  constructor(sesion) {
    this.id_sesion = sesion.id_sesion;
    this.id_taller = sesion.id_taller;
    this.fecha = sesion.fecha;
    this.tipo = sesion.tipo;
    this.detalle = sesion.detalle;
  }

  // Crear una nueva sesión de taller
  static async crear(nuevaSesion) {
    try {
      const [result] = await execute(
        'INSERT INTO sesiones_taller (id_taller, fecha, tipo, detalle) VALUES (?, ?, ?, ?)',
        [nuevaSesion.id_taller, nuevaSesion.fecha, nuevaSesion.tipo, nuevaSesion.detalle]
      );

      if (result.insertId) {
        const [sesionRows] = await execute('SELECT * FROM sesiones_taller WHERE id_sesion = ?', [result.insertId]);

        if (sesionRows.length === 0) {
          throw new Error('Sesión no encontrada después de la inserción.');
        }

        return new SesionTaller(sesionRows[0]);
      } else {
        throw new Error('Error al insertar la sesión de taller.');
      }
    } catch (error) {
      console.error('Error en SesionTaller.crear:', error);
      throw error;
    }
  }

  // Obtener todas las sesiones de un taller específico
  static async obtenerPorTallerId(tallerId) {
    try {
      const rows = await query('SELECT * FROM sesiones_taller WHERE id_taller = ?', [tallerId]);

      return rows.map(row => new SesionTaller(row));
    } catch (error) {
      console.error(`Error al obtener sesiones para el taller con ID ${tallerId}:`, error);
      throw error;
    }
  }

  // Obtener una sesión específica por su ID
  static async obtenerPorId(id_sesion) {
    try {
      const rows = await query('SELECT * FROM sesiones_taller WHERE id_sesion = ?', [id_sesion]);

      if (rows.length === 0) return null;

      return new SesionTaller(rows[0]);
    } catch (error) {
      console.error(`Error al obtener la sesión con ID ${id_sesion}:`, error);
      throw error;
    }
  }

  // Actualizar una sesión existente
  async actualizar() {
    try {
      const [result] = await execute(
        'UPDATE sesiones_taller SET id_taller = ?, fecha = ?, tipo = ?, detalle = ? WHERE id_sesion = ?',
        [this.id_taller, this.fecha, this.tipo, this.detalle, this.id_sesion]
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error(`Error al actualizar la sesión con ID ${this.id_sesion}:`, error);
      throw error;
    }
  }

  // Eliminar una sesión
  static async eliminar(id_sesion) {
    try {
      const [result] = await execute('DELETE FROM sesiones_taller WHERE id_sesion = ?', [id_sesion]);

      if (result.affectedRows > 0) {
        return id_sesion; // Retorna el ID de la sesión eliminada
      } else {
        throw new Error('Sesión no encontrada para eliminar.');
      }
    } catch (error) {
      console.error(`Error al eliminar la sesión con ID ${id_sesion}:`, error);
      throw error;
    }
  }
}

export default SesionTaller;
