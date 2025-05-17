import { execute, query } from '../utils/db.js';

class Evento {
  constructor(evento) {
    this.id = evento.id;
    this.nombre = evento.nombre;
    this.descripcion = evento.descripcion;
    this.fecha = evento.fecha;
    this.hora = evento.hora;
    this.lugar = evento.lugar;
    this.imagen = evento.imagen;
    this.codigo_coordinador = evento.codigo_coordinador; // Nueva columna
  }

  static async crear(nuevoEvento) {
    try {
      const [result] = await execute(
        'INSERT INTO eventos (nombre, descripcion, fecha, hora, lugar, imagen, codigo_coordinador) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          nuevoEvento.nombre || null,
          nuevoEvento.descripcion || null,
          nuevoEvento.fecha || null,
          nuevoEvento.hora || null,
          nuevoEvento.lugar || null,
          nuevoEvento.imagen || null,
          nuevoEvento.codigo_coordinador || null // Nuevo campo
        ]
      );

      const [eventoRows] = await execute('SELECT * FROM eventos WHERE id = ?', [result.insertId]);
      
      if (eventoRows.length === 0) {
        throw new Error('Evento no encontrado después de la inserción.');
      }

      return new Evento(eventoRows[0]);
    } catch (error) {
      console.error('Error en Evento.crear:', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const eventos = await query('SELECT * FROM eventos');
      return eventos.map(evento => new Evento(evento));
    } catch (error) {
      console.error('Error en Evento.obtenerTodos:', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    const [eventos] = await execute('SELECT * FROM eventos WHERE id = ?', [id]);
    if (eventos.length === 0) return null;
    return new Evento(eventos[0]);
  }

  static async obtenerPorCodigoCoordinador(codigoCoordinador) {
    try {
      const [eventos] = await execute('SELECT * FROM eventos WHERE codigo_coordinador = ?', [codigoCoordinador]);
      return eventos.map(evento => new Evento(evento));
    } catch (error) {
      console.error('Error en Evento.obtenerPorCodigoCoordinador:', error);
      throw error;
    }
  }

  async actualizar() {
    await execute(
      'UPDATE eventos SET nombre = ?, descripcion = ?, fecha = ?, hora = ?, lugar = ?, imagen = ?, codigo_coordinador = ? WHERE id = ?',
      [
        this.nombre, 
        this.descripcion, 
        this.fecha, 
        this.hora, 
        this.lugar, 
        this.imagen, 
        this.codigo_coordinador, // Nuevo campo
        this.id
      ]
    );
  }

  async eliminar() {
    await execute('DELETE FROM eventos WHERE id = ?', [this.id]);
  }
}

export default Evento;
