import { execute, query } from '../utils/db.js';

class OfertaLaboral {
  constructor(oferta) {
    this.id = oferta.id;
    this.nombre = oferta.nombre;
    this.descripcion = oferta.descripcion;
    this.requisitos = oferta.requisitos;
    this.carrera_destino = oferta.carrera_destino;
    this.empresa = oferta.empresa;
    this.nro_contacto = oferta.nro_contacto;
    this.correo_contacto = oferta.correo_contacto;
    this.fecha_inicio = oferta.fecha_inicio;
    this.fecha_fin = oferta.fecha_fin;
    this.imagen = oferta.imagen;
    this.id_usuario = oferta.id_usuario; // Agregar id_usuario
  }

  static async crear(nuevoOferta) {
    try {
      // Insertar la nueva oferta incluyendo id_usuario
      const [result] = await execute(
        'INSERT INTO ofertas_laborales (nombre, descripcion, requisitos, carrera_destino, empresa, nro_contacto, correo_contacto, fecha_inicio, fecha_fin, imagen, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          nuevoOferta.nombre || null,
          nuevoOferta.descripcion || null,
          nuevoOferta.requisitos || null,
          nuevoOferta.carrera_destino || null,
          nuevoOferta.empresa || null,
          nuevoOferta.nro_contacto || null,
          nuevoOferta.correo_contacto || null,
          nuevoOferta.fecha_inicio || null,
          nuevoOferta.fecha_fin || null,
          nuevoOferta.imagen || null,
          nuevoOferta.id_usuario || null,  // Insertar el id_usuario
        ]
      );

      // Obtener la oferta recién insertada
      const [ofertaRows] = await execute('SELECT * FROM ofertas_laborales WHERE id = ?', [result.insertId]);

      if (ofertaRows.length === 0) {
        throw new Error('Oferta no encontrada después de la inserción.');
      }

      return new OfertaLaboral(ofertaRows[0]);
    } catch (error) {
      console.error('Error en OfertaLaboral.crear:', error);
      throw error;
    }
  }

  static async obtenerTodos() {
    try {
      const ofertas = await query('SELECT * FROM ofertas_laborales');
      return ofertas.map(oferta => new OfertaLaboral(oferta));
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  static async obtenerPorId(id) {
    const [ofertas] = await execute('SELECT * FROM ofertas_laborales WHERE id = ?', [id]);
    if (ofertas.length === 0) return null;
    return new OfertaLaboral(ofertas[0]);
  }

  static async obtenerPorCarrera(carreraDestino) { 
    const [ofertas] = await execute('SELECT * FROM ofertas_laborales WHERE carrera_destino = ?', [carreraDestino]);
    if (ofertas.length === 0) return null;
    return ofertas.map(oferta => new OfertaLaboral(oferta)); // Devolver una lista de ofertas
  }

  static async obtenerPorFecha() {
    try {
      // Consulta SQL para obtener solo ofertas laborales cuya fecha_fin no haya pasado
      const ofertas = await query('SELECT * FROM ofertas_laborales WHERE fecha_fin >= CURDATE()');
      return ofertas.map(oferta => new OfertaLaboral(oferta));
    } catch (error) {
      console.error('Error en obtenerPorFecha:', error);
      throw error;
    }
  }
  
  static async obtenerPorFechaEspecifica(fechaEspecifica) {
    try {
      // Consulta SQL para obtener solo ofertas laborales cuya fecha_fin sea mayor o igual a la fecha específica
      const [ofertas] = await execute('SELECT * FROM ofertas_laborales WHERE fecha_fin >= ?', [fechaEspecifica]);
      
      // Retorna un array de instancias de OfertaLaboral
      return ofertas.map(oferta => new OfertaLaboral(oferta));
    } catch (error) {
      console.error('Error en obtenerPorFechaEspecifica:', error);
      throw error;
    }
  }

  // Método para obtener ofertas por id_usuario
  static async obtenerPorUsuario(id_usuario) {
    try {
      // Ejecutar la consulta SQL
      const [ofertas] = await execute('SELECT * FROM ofertas_laborales WHERE id_usuario = ?', [id_usuario]);

      // Si no se encuentran ofertas, devolver un array vacío
      if (!ofertas || ofertas.length === 0) {
        return [];
      }

      // Mapear las ofertas encontradas a instancias de OfertaLaboral
      return ofertas.map(oferta => new OfertaLaboral(oferta));
      
    } catch (error) {
      // Registrar el error y devolver una descripción útil
      console.error(`Error al obtener las ofertas laborales para el usuario con id ${id_usuario}:`, error);
      throw new Error('Error al obtener las ofertas laborales del usuario.');
    }
  }

  async actualizar() {
    await execute(
      'UPDATE ofertas_laborales SET nombre = ?, descripcion = ?, requisitos = ?, carrera_destino = ?, empresa = ?, nro_contacto = ?, correo_contacto = ?, fecha_inicio = ?, fecha_fin = ?, imagen = ? WHERE id = ?',
      [
        this.nombre, this.descripcion, this.requisitos, this.carrera_destino,
        this.empresa, this.nro_contacto, this.correo_contacto,
        this.fecha_inicio, this.fecha_fin, this.imagen,
        this.id
      ]
    );
  }

  async eliminar() {
    await execute('DELETE FROM ofertas_laborales WHERE id = ?', [this.id]);
  }
}

export default OfertaLaboral;
