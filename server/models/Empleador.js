import { execute, query } from '../utils/db.js';

class Empleador {
  // Crear un nuevo empleador
  static async crear({ nombre_empresa, area_negocio, direccion, telefono, email }) {
    try {
      // Validar los datos de entrada
      if (!nombre_empresa || !area_negocio || !direccion || !telefono || !email) {
        throw new Error('Todos los campos son requeridos para crear un empleador');
      }

      const sql = `
        INSERT INTO empleadores (nombre_empresa, area_negocio, direccion, telefono, email)
        VALUES (?, ?, ?, ?, ?)
      `;
      const result = await execute(sql, [nombre_empresa, area_negocio, direccion, telefono, email]);

      return {
        message: 'Empleador creado exitosamente',
        insertId: result.insertId,
      };
    } catch (error) {
      console.error('Error al crear el empleador:', error);
      throw new Error('Error al crear el empleador');
    }
  }

  // Obtener todos los empleadores
  static async obtenerTodos() {
    try {
      const sql = 'SELECT * FROM empleadores';
      const rows = await query(sql);
      return rows;
    } catch (error) {
      console.error('Error al obtener todos los empleadores:', error);
      throw new Error('Error al obtener los empleadores');
    }
  }

  // Obtener un empleador por ID
  static async obtenerPorId(id) {
    try {
      if (!id) throw new Error('ID requerido');

      const sql = 'SELECT * FROM empleadores WHERE id = ?';
      const rows = await query(sql, [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error(`Error al obtener el empleador con ID ${id}:`, error);
      throw new Error('Error al obtener el empleador');
    }
  }

  // Eliminar un empleador por ID
  static async eliminar(id) {
    try {
      if (!id) throw new Error('ID requerido');

      const sql = 'DELETE FROM empleadores WHERE id = ?';
      const result = await execute(sql, [id]);

      return result.affectedRows > 0
        ? 'Empleador eliminado exitosamente'
        : 'No se encontró el empleador';
    } catch (error) {
      console.error(`Error al eliminar el empleador con ID ${id}:`, error);
      throw new Error('Error al eliminar el empleador');
    }
  }

  // Contar el total de ofertas publicadas por el empleador
  static async countOfertas(empleadorId) {
    try {
      const [rows] = await query('SELECT COUNT(*) as total FROM ofertas WHERE empleador_id = ?', [empleadorId]);
      return rows[0].total;
    } catch (error) {
      console.error('Error al contar las ofertas:', error);
      throw error;
    }
  }

  // Contar el total de postulaciones recibidas por el empleador
  static async countPostulaciones(empleadorId) {
    try {
      const [rows] = await query(
        'SELECT COUNT(*) as total FROM postulaciones WHERE oferta_id IN (SELECT id FROM ofertas WHERE empleador_id = ?)',
        [empleadorId]
      );
      return rows[0].total;
    } catch (error) {
      console.error('Error al contar las postulaciones:', error);
      throw error;
    }
  }

  // Contar el total de contratados por el empleador
  static async countContratados(empleadorId) {
    try {
      const [rows] = await query(
        'SELECT COUNT(*) as total FROM postulaciones WHERE estado = "contratado" AND oferta_id IN (SELECT id FROM ofertas WHERE empleador_id = ?)',
        [empleadorId]
      );
      return rows[0].total;
    } catch (error) {
      console.error('Error al contar los contratados:', error);
      throw error;
    }
  }
}

export default Empleador;
