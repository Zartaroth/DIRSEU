import { execute, query } from '../utils/db.js';

class Capacitacion {
  constructor(capacitacion) {
    this.id = capacitacion.id;
    this.nombre = capacitacion.nombre;
    this.descripcion = capacitacion.descripcion;
    this.fecha_inicio = capacitacion.fecha_inicio;
    this.fecha_fin = capacitacion.fecha_fin;
    this.lugar = capacitacion.lugar;
    this.cupo_maximo = capacitacion.cupo_maximo;
    this.imagen = capacitacion.imagen;
  }

  static async crear(nuevoCapacitacion) {
    try {
      // Insertar la nueva capacitacion
      const [result] = await execute(
        'INSERT INTO capacitaciones (nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          nuevoCapacitacion.nombre || null,
          nuevoCapacitacion.descripcion || null,
          nuevoCapacitacion.fecha_inicio || null,
          nuevoCapacitacion.fecha_fin || null,
          nuevoCapacitacion.lugar || null,
          nuevoCapacitacion.cupo_maximo || null,
          nuevoCapacitacion.imagen || null
        ]
      );

      // Obtener la Capacitacion recién insertada
      const [capacitacionRows] = await execute('SELECT * FROM capacitaciones WHERE id = ?', [result.insertId]);
      
      if (capacitacionRows.length === 0) {
        throw new Error('Capacitacion no encontrado después de la inserción.');
      }

      return new Capacitacion(capacitacionRows[0]);
    } catch (error) {
      console.error('Error en Capacitacion.crear:', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const capacitaciones = await query('SELECT * FROM capacitaciones');
      return capacitaciones.map(capacitacion => new Capacitacion(capacitacion));
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    const [capacitaciones] = await execute('SELECT * FROM capacitaciones WHERE id = ?', [id]);
    if (capacitaciones.length === 0) return null;
    return new Capacitacion(capacitaciones[0]);
  }

  async actualizar() {
    await execute(
      'UPDATE capacitaciones SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, lugar = ?, cupo_maximo = ? WHERE id = ?',
      [this.nombre, this.descripcion, this.fecha_inicio, this.fecha_fin, this.lugar, this.cupo_maximo, this.id]
    );
  }

  async eliminar() {
    await execute('DELETE FROM capacitaciones WHERE id = ?', [this.id]);
  }
}

export default Capacitacion;
