import { execute, query } from '../utils/db.js';

class Taller {
  constructor(taller) {
    this.id = taller.id;
    this.nombre = taller.nombre;
    this.descripcion = taller.descripcion;
    this.fecha_inicio = taller.fecha_inicio;
    this.fecha_fin = taller.fecha_fin;
    this.lugar = taller.lugar;
    this.cupo_maximo = taller.cupo_maximo;
    this.imagen = taller.imagen;
    this.codigo_instructor = taller.codigo_instructor;
  }

  static async crear(nuevoTaller) {
    try {
      // Insertar el nuevo Taller
      const [result] = await execute(
        'INSERT INTO talleres (nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo, imagen, codigo_instructor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          nuevoTaller.nombre,
          nuevoTaller.descripcion || null,
          nuevoTaller.fecha_inicio || null,
          nuevoTaller.fecha_fin || null,
          nuevoTaller.lugar || null,
          nuevoTaller.cupo_maximo || null,
          nuevoTaller.imagen || null,
          nuevoTaller.codigo_instructor, 
        ]
      );
      
      console.log('Resultado del INSERT:', result);

      // Obtener el taller recién insertado
      const [tallerRows] = await execute('SELECT * FROM talleres WHERE id = ?', [result.insertId]);
      
      if (tallerRows.length === 0) {
        throw new Error('Taller no encontrado después de la inserción.');
      }

      return new Taller(tallerRows[0]);
    } catch (error) {
      console.error('Error en Taller.crear:', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const talleres = await query('SELECT * FROM talleres');
      return talleres.map(taller => new Taller(taller));
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  static async obtenerPorCodigoInstructor(codigo_instructor) {
    try {
      // Validar que el código del instructor sea válido
      if (!codigo_instructor) {
        throw new Error('El código del instructor es obligatorio.');
      }
  
      // Ejecutar la consulta SQL de manera segura
      const [talleres] = await execute(
        'SELECT * FROM talleres WHERE codigo_instructor = ?',
        [codigo_instructor]
      );
  
      // Si no hay talleres encontrados, devolver una lista vacía
      if (!talleres || talleres.length === 0) {
        console.warn(`No se encontraron talleres para el codigo_instructor: ${codigo_instructor}`);
        return [];
      }
  
      // Mapear los resultados a instancias de la clase Taller
      return talleres.map(taller => new Taller(taller));
    } catch (error) {
      console.error('Error en obtenerPorCodigoInstructor:', error.message);
      throw new Error('Ocurrió un error al obtener los talleres. Inténtalo de nuevo.');
    }
  }

  static async obtenerPorId(id) {
    const [talleres] = await execute('SELECT * FROM talleres WHERE id = ?', [id]);
    if (talleres.length === 0) return null;
    return new Taller(talleres[0]);
  }

  async actualizar() {
    await execute(
      'UPDATE talleres SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, lugar = ?, cupo_maximo = ?, codigo_instructor = ? WHERE id = ?',
      [this.nombre, this.descripcion, this.fecha_inicio, this.fecha_fin, this.lugar, this.cupo_maximo, this.codigo_instructor, this.id]
    );
  }

  async eliminar() {
    await execute('DELETE FROM talleres WHERE id = ?', [this.id]);
  }
}

export default Taller;