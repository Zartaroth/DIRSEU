import { execute, query } from '../utils/db.js';

class Oferta {
  constructor(oferta) {
    this.id = oferta.id;
    this.titulo = oferta.titulo;
    this.descripcion = oferta.descripcion;
    this.requisitos = oferta.requisitos;
    this.habilidades = oferta.habilidades;
    this.experiencia_minima = oferta.experiencia_minima;
    this.carrera_destino = oferta.carrera_destino;
    this.empleador_id = oferta.empleador_id;
  }

  static async crear(nuevaOferta) {
    try {
      // Insertar la nueva oferta
      const [result] = await execute(
        'INSERT INTO ofertas_empleo (titulo, descripcion, requisitos, habilidades, experiencia_minima, carrera_destino, empleador_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          nuevaOferta.titulo || null,
          nuevaOferta.descripcion || null,
          nuevaOferta.requisitos || null,
          nuevaOferta.habilidades || null,
          nuevaOferta.experiencia_minima || null,
          nuevaOferta.carrera_destino || null,
          nuevaOferta.empleador_id || null
        ]
      );

      // Obtener la oferta recién insertada
      const [ofertaRows] = await execute('SELECT * FROM ofertas_empleo WHERE id = ?', [result.insertId]);
      
      if (ofertaRows.length === 0) {
        throw new Error('Oferta no encontrada después de la inserción.');
      }

      return new Oferta(ofertaRows[0]);
    } catch (error) {
      console.error('Error en Oferta.crear:', error);
      throw error;
    }
  }

  static async obtenerTodas() {
    try {
      const ofertas = await query('SELECT * FROM ofertas_empleo');
      return ofertas.map(oferta => new Oferta(oferta));
    } catch (error) {
      console.error('Error en obtenerTodas:', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    try {
      const [ofertas] = await execute('SELECT * FROM ofertas_empleo WHERE id = ?', [id]);
      if (ofertas.length === 0) return null;
      return new Oferta(ofertas[0]);
    } catch (error) {
      console.error('Error en obtenerPorId:', error);
      throw error;
    }
  }

  static async obtenerPorEmpleador(empleador_id) {
    try {
      const [ofertas] = await execute('SELECT * FROM ofertas_empleo WHERE empleador_id = ?', [empleador_id]);
      if (ofertas.length === 0) return [];
      return ofertas.map(oferta => new Oferta(oferta));
    } catch (error) {
      console.error('Error en obtenerPorEmpleador:', error);
      throw error;
    }
  }

  async actualizar() {
    await execute(
      'UPDATE ofertas_empleo SET titulo = ?, descripcion = ?, requisitos = ?, habilidades = ?, experiencia_minima = ?, carrera_destino = ? WHERE id = ?',
      [this.titulo, this.descripcion, this.requisitos, this.habilidades, this.experiencia_minima, this.carrera_destino, this.id]
    );
  }

  async eliminar() {
    await execute('DELETE FROM ofertas_empleo WHERE id = ?', [this.id]);
  }
}

export default Oferta;
