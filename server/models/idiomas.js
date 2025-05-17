import { execute, query } from '../utils/db.js';

class Idioma {
  constructor(idioma) {
    this.id = idioma.id;
    this.id_egresado = idioma.id_egresado;
    this.idioma = idioma.idioma;
    this.nivel = idioma.nivel;
  }

  // Crear un nuevo idioma
  static async crear(nuevoIdioma) {
    try {
      const [result] = await execute(
        'INSERT INTO idiomas (id_egresado, idioma, nivel) VALUES (?, ?, ?)',
        [nuevoIdioma.id_egresado, nuevoIdioma.idioma, nuevoIdioma.nivel]
      );

      const [idiomaRows] = await execute('SELECT * FROM idiomas WHERE id = ?', [result.insertId]);

      if (idiomaRows.length === 0) {
        throw new Error('Idioma no encontrado después de la inserción.');
      }

      return new Idioma(idiomaRows[0]);
    } catch (error) {
      console.error('Error en Idioma.crear:', error);
      throw error;
    }
  }

  // Obtener todos los idiomas de un egresado
  static async obtenerPorEgresado(id_egresado) {
    try {
      const idiomas = await query('SELECT * FROM idiomas WHERE id_egresado = ?', [id_egresado]);
  
      // Si no se encuentran registros, devuelve un mensaje indicando que no hay registros
      if (!idiomas || idiomas.length === 0) {
        return { message: "No hay registros de idiomas para este egresado." };
      }
  
      // Si hay registros, devuelve los mapeados en instancias de Idioma
      return idiomas.map(idioma => new Idioma(idioma));
    } catch (error) {
      // Si ocurre un error, captura el error y lo imprime en consola
      console.error('Error en obtenerPorEgresado:', error);
  
      // Retorna un mensaje de error genérico
      return { message: "Error al procesar la solicitud." };
    }
  }

  // Obtener un idioma específico por ID
  static async obtenerPorId(id) {
    const [idiomas] = await execute('SELECT * FROM idiomas WHERE id = ?', [id]);
    if (idiomas.length === 0) return null;
    return new Idioma(idiomas[0]);
  }

  // Obtener todos los idiomas
  static async obtenerTodos() {
    try {
      const [idiomas] = await execute('SELECT * FROM idiomas');
      return idiomas.map(idioma => new Idioma(idioma));
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  // Actualizar un idioma existente
  async actualizar() {
    try {
      await execute(
        'UPDATE idiomas SET idioma = ?, nivel = ? WHERE id = ?',
        [this.idioma, this.nivel, this.id]
      );
    } catch (error) {
      console.error('Error en Idioma.actualizar:', error);
      throw error;
    }
  }

  // Eliminar un idioma por ID
  async eliminar() {
    try {
      await execute('DELETE FROM idiomas WHERE id = ?', [this.id]);
    } catch (error) {
      console.error('Error en Idioma.eliminar:', error);
      throw error;
    }
  }
}

export default Idioma;
