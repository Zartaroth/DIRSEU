import { execute, query } from '../utils/db.js';

class Habilidad {
  constructor(habilidad) {
    this.id = habilidad.id;
    this.id_egresado = habilidad.id_egresado;
    this.habilidad = habilidad.habilidad;
    this.nivel = habilidad.nivel;
  }

  // Crear una nueva habilidad
  static async crear(nuevaHabilidad) {
    try {
      const [result] = await execute(
        'INSERT INTO habilidades (id_egresado, habilidad, nivel) VALUES (?, ?, ?)',
        [
          nuevaHabilidad.id_egresado,
          nuevaHabilidad.habilidad,
          nuevaHabilidad.nivel,
        ]
      );

      const [habilidadRows] = await execute('SELECT * FROM habilidades WHERE id = ?', [result.insertId]);

      if (habilidadRows.length === 0) {
        throw new Error('Habilidad no encontrada después de la inserción.');
      }

      return new Habilidad(habilidadRows[0]);
    } catch (error) {
      console.error('Error en Habilidad.crear:', error);
      throw error;
    }
  }

  // Obtener todas las habilidades
  static async obtenerTodas() {
    try {
      const habilidades = await query('SELECT * FROM habilidades');
      return habilidades.map(habilidad => new Habilidad(habilidad));
    } catch (error) {
      console.error('Error al obtener todas las habilidades:', error);
      throw error;
    }
  }

  // Obtener todas las habilidades de un egresado
  static async obtenerPorEgresado(id_egresado) {
    try {
      const habilidades = await query('SELECT * FROM habilidades WHERE id_egresado = ?', [id_egresado]);
  
      // Si no se encuentran registros, devuelve un mensaje indicando que no hay registros
      if (!habilidades || habilidades.length === 0) {
        return { message: "No hay registros de habilidades para este egresado." };
      }
  
      // Si hay registros, devuelve los mapeados en instancias de Habilidad
      return habilidades.map(habilidad => new Habilidad(habilidad));
    } catch (error) {
      // Si ocurre un error, captura el error y lo imprime en consola
      console.error('Error en obtenerPorEgresado:', error);
  
      // Retorna un mensaje de error genérico
      return { message: "Error al procesar la solicitud." };
    }
  }
  

  // Obtener una habilidad específica por ID
  static async obtenerPorId(id) {
    const [habilidades] = await execute('SELECT * FROM habilidades WHERE id = ?', [id]);
    if (habilidades.length === 0) return null;
    return new Habilidad(habilidades[0]);
  }

  // Actualizar una habilidad existente
  async actualizar() {
    try {
      await execute(
        'UPDATE habilidades SET habilidad = ?, nivel = ? WHERE id = ?',
        [
          this.habilidad,
          this.nivel,
          this.id
        ]
      );
    } catch (error) {
      console.error('Error en Habilidad.actualizar:', error);
      throw error;
    }
  }

  // Eliminar una habilidad por ID
  async eliminar() {
    try {
      await execute('DELETE FROM habilidades WHERE id = ?', [this.id]);
    } catch (error) {
      console.error('Error en Habilidad.eliminar:', error);
      throw error;
    }
  }
}

export default Habilidad;
