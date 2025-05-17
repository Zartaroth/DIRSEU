import { execute, query } from '../utils/db.js';

class ExperienciaLaboral {
  constructor(experiencia) {
    this.id = experiencia.id;
    this.id_egresado = experiencia.id_egresado;
    this.empresa = experiencia.empresa;
    this.puesto = experiencia.puesto;
    this.descripcion = experiencia.descripcion;
    this.fecha_inicio = experiencia.fecha_inicio;
    this.fecha_fin = experiencia.fecha_fin;
  }

  // Crear una nueva experiencia laboral
  static async crear(nuevaExperiencia) {
    try {
      const [result] = await execute(
        'INSERT INTO experiencias_laborales (id_egresado, empresa, puesto, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?, ?)',
        [
          nuevaExperiencia.id_egresado,
          nuevaExperiencia.empresa,
          nuevaExperiencia.puesto || null,
          nuevaExperiencia.descripcion || null,
          nuevaExperiencia.fecha_inicio,
          nuevaExperiencia.fecha_fin,
        ]
      );

      // Obtener la experiencia recién insertada
      const [experienciaRows] = await execute('SELECT * FROM experiencias_laborales WHERE id = ?', [result.insertId]);

      if (experienciaRows.length === 0) {
        throw new Error('Experiencia no encontrada después de la inserción.');
      }

      return new ExperienciaLaboral(experienciaRows[0]);
    } catch (error) {
      console.error('Error en ExperienciaLaboral.crear:', error);
      throw error;
    }
  }

  // Obtener todas las experiencias laborales
  static async obtenerTodos() {
    try {
      const experiencias = await query('SELECT * FROM experiencias_laborales');
      return experiencias.map(exp => new ExperienciaLaboral(exp));
    } catch (error) {
      console.error('Error en obtenerTodos:', error);
      throw error;
    }
  }

  // Obtener experiencias laborales por ID
  static async obtenerPorId(id) {
    const [experiencias] = await execute('SELECT * FROM experiencias_laborales WHERE id = ?', [id]);
    if (experiencias.length === 0) return null;
    return new ExperienciaLaboral(experiencias[0]);
  }

  // Obtener experiencias laborales por ID del egresado
  static async obtenerPorEgresado(idEgresado) {
    try {
      // Ejecuta la consulta para obtener las experiencias laborales del egresado
      const [experiencias] = await execute('SELECT * FROM experiencias_laborales WHERE id_egresado = ?', [idEgresado]);
    
      // Si no se encuentran experiencias o la lista está vacía, devuelve un mensaje específico
      if (!experiencias || experiencias.length === 0) {
        return { message: "No hay registros para este egresado." };
      }
    
      // Si hay experiencias, devuelve los registros mapeados en instancias de ExperienciaLaboral
      return experiencias.map(exp => new ExperienciaLaboral(exp));
    } catch (error) {
      // Si ocurre un error, captura el error y lo imprime en consola
      console.error(`Error al obtener las experiencias laborales para el egresado con id ${idEgresado}:`, error);
    
      // Retorna un mensaje de error genérico
      return { message: "Error al procesar la solicitud." };
    }
  }
  

  // Actualizar una experiencia laboral
  async actualizar() {
    try {
      const [result] = await execute(
        'UPDATE experiencias_laborales SET empresa = ?, puesto = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ?',
        [this.empresa, this.puesto, this.descripcion, this.fecha_inicio, this.fecha_fin, this.id]
      );
      if (result.affectedRows === 0) throw new Error('No se encontró la experiencia laboral para actualizar');
      return this;
    } catch (error) {
      throw new Error(`Error al actualizar experiencia laboral: ${error.message}`);
    }
  }

  static async eliminar(id) {
    try {
      const [result] = await execute('DELETE FROM experiencias_laborales WHERE id = ?', [id]);
      if (result.affectedRows === 0) throw new Error('No se encontró la experiencia laboral para eliminar');
      return id;
    } catch (error) {
      throw new Error(`Error al eliminar experiencia laboral: ${error.message}`);
    }
  }
}

export default ExperienciaLaboral;
