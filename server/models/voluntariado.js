import { execute, query } from '../utils/db.js';

class Voluntariado {
  constructor(voluntariado) {
    this.id = voluntariado.id;
    this.nombre = voluntariado.nombre;
    this.descripcion = voluntariado.descripcion;
    this.fecha_inicio = voluntariado.fecha_inicio;
    this.fecha_fin = voluntariado.fecha_fin;
    this.lugar = voluntariado.lugar;
    this.cupo_maximo = voluntariado.cupo_maximo;
    this.imagen = voluntariado.imagen;
  }

  static async crear(nuevoVoluntariado) {
    try {
      // Insertar el nuevo voluntariado
      const [result] = await execute(
        'INSERT INTO voluntariados (nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          nuevoVoluntariado.nombre || null,
          nuevoVoluntariado.descripcion || null,
          nuevoVoluntariado.fecha_inicio || null,
          nuevoVoluntariado.fecha_fin || null,
          nuevoVoluntariado.lugar || null,
          nuevoVoluntariado.cupo_maximo || null, // Asegúrate de que sea un número si es necesario
          nuevoVoluntariado.imagen || null
        ]
      );

      // Obtener el voluntariado recién insertado
      const [voluntariadoRows] = await execute('SELECT * FROM voluntariados WHERE id = ?', [result.insertId]);
      
      if (voluntariadoRows.length === 0) {
        throw new Error('Voluntariado no encontrado después de la inserción.');
      }

      return new Voluntariado(voluntariadoRows[0]);
    } catch (error) {
      console.error('Error en Voluntariado.crear:', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const voluntariados = await query('SELECT * FROM voluntariados');
      return voluntariados.map(voluntariado => new Voluntariado(voluntariado));
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    const [voluntariados] = await execute('SELECT * FROM voluntariados WHERE id = ?', [id]);
    if (voluntariados.length === 0) return null;
    return new Voluntariado(voluntariados[0]);
  }

  async actualizar() {
    await execute(
      'UPDATE voluntariados SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, lugar = ?, cupo_maximo = ? WHERE id = ?',
      [this.nombre, this.descripcion, this.fecha_inicio, this.fecha_fin, this.lugar, this.cupo_maximo, this.id]
    );
  }

  async eliminar() {
    await execute('DELETE FROM voluntariados WHERE id = ?', [this.id]);
  }
}

export default Voluntariado;