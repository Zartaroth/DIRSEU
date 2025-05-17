import { execute, query } from '../utils/db.js';

class Logro {
  constructor(logro) {
    this.id = logro.id;
    this.id_egresado = logro.id_egresado;
    this.logro = logro.logro;
    this.descripcion = logro.descripcion;
    this.fecha = logro.fecha;
  }

  // Crear un nuevo logro
  static async crear(nuevoLogro) {
    try {
      // Inserción del nuevo logro en la base de datos
      const [result] = await execute(
        'INSERT INTO logros (id_egresado, logro, descripcion, fecha) VALUES (?, ?, ?, ?)',
        [nuevoLogro.id_egresado, nuevoLogro.logro, nuevoLogro.descripcion, nuevoLogro.fecha]
      );

      // Recuperar el logro insertado por su ID
      const [logroRows] = await execute('SELECT * FROM logros WHERE id = ?', [result.insertId]);

      // Si no se encuentra el logro, lanzar un error
      if (logroRows.length === 0) {
        throw new Error('Logro no encontrado después de la inserción.');
      }

      // Devolver el logro recién creado
      return new Logro(logroRows[0]);
    } catch (error) {
      console.error('Error en Logro.crear:', error);
      throw error;
    }
  }

  // Obtener todos los logros de un egresado
  static async obtenerPorEgresado(id_egresado) {
    try {
      // Consulta todos los logros de un egresado
      const logros = await query('SELECT * FROM logros WHERE id_egresado = ?', [id_egresado]);
  
      // Si no se encuentran registros, devuelve un mensaje indicando que no hay logros
      if (!logros || logros.length === 0) {
        return { message: "No hay logros registrados para este egresado." };
      }
  
      // Si hay logros, devuelve los mapeados en instancias de Logro
      return logros.map(logro => new Logro(logro));
    } catch (error) {
      // Si ocurre un error, captura el error y lo imprime en consola
      console.error('Error en obtenerPorEgresado:', error);
  
      // Retorna un mensaje de error genérico
      return { message: "Error al procesar la solicitud." };
    }
  }

  // Obtener un logro específico por ID
  static async obtenerPorId(id) {
    try {
      // Consulta un logro específico por su ID
      const [logros] = await execute('SELECT * FROM logros WHERE id = ?', [id]);
      if (logros.length === 0) return null;
      return new Logro(logros[0]);
    } catch (error) {
      console.error('Error en Logro.obtenerPorId:', error);
      throw error;
    }
  }

  // Obtener todos los logros
  static async obtenerTodos() {
    try {
      // Consulta todos los logros
      const [logros] = await execute('SELECT * FROM logros');
      return logros.map(logro => new Logro(logro));
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  // Actualizar un logro existente
  async actualizar() {
    try {
      // Actualiza el logro en la base de datos
      await execute(
        'UPDATE logros SET logro = ?, descripcion = ?, fecha = ? WHERE id = ?',
        [this.logro, this.descripcion, this.fecha, this.id]
      );
    } catch (error) {
      console.error('Error en Logro.actualizar:', error);
      throw error;
    }
  }

  // Eliminar un logro por ID
  async eliminar() {
    try {
      // Elimina el logro por su ID
      await execute('DELETE FROM logros WHERE id = ?', [this.id]);
    } catch (error) {
      console.error('Error en Logro.eliminar:', error);
      throw error;
    }
  }
}

export default Logro;
