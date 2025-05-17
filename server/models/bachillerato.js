import { execute, query } from '../utils/db.js';

class Bachillerato {
    constructor(bachiller) {
      this.id = bachiller.id;
      this.id_egresado = bachiller.idEgresado;
      this.tipo = bachiller.tipo;
      this.fecha_inicio = bachiller.fechaInicio;
      this.fecha_fin = bachiller.fechaFin;
      this.fecha_obtencion = bachiller.fechaObtencion;
      this.nro_resolucion = bachiller.nroResolucion;
    }
  
    static async crear(nuevoBachillerato) {
      try {
        const [result] = await execute(
          'INSERT INTO bachillerato (idEgresado, tipo, fechaInicio, fechaFin, fechaObtencion, nroResolucion) VALUES (?, ?, ?, ?, ?, ?)',
          [
            nuevoBachillerato.id_egresado,
            nuevoBachillerato.tipo,
            nuevoBachillerato.fecha_inicio,
            nuevoBachillerato.fecha_fin,
            nuevoBachillerato.fecha_obtencion,
            nuevoBachillerato.nro_resolucion,
          ]
        );
        const [bachillerRows] = await execute('SELECT * FROM bachillerato WHERE id = ?', [result.insertId]);
        return new Bachillerato(bachillerRows[0]);
      } catch (error) {
        throw error;
      }
    }

    // Obtener todas las experiencias laborales
    static async obtenerTodos() {
      try {
        const bachilleratos = await query('SELECT * FROM bachillerato');
        return bachilleratos.map(exp => new Bachillerato(exp));
      } catch (error) {
        console.error('Error en obtenerTodos:', error);
        throw error;
      }
    }

    // Obtener bachilleratos por ID
    static async obtenerPorId(id) {
      const [bachilleratos] = await execute('SELECT * FROM bachillerato WHERE id = ?', [id]);
      if (bachilleratos.length === 0) return null;
      return new Bachillerato(bachilleratos[0]);
    }
  
    static async obtenerPorEgresado(idEgresado) {
      const [bachilleratos] = await execute('SELECT * FROM bachillerato WHERE idEgresado = ?', [idEgresado]);
      return bachilleratos.map(b => new Bachillerato(b));
    }
  
    async actualizar() {
      try {
        const [result] = await execute(
          'UPDATE bachillerato SET tipo = ?, fechaInicio = ?, fechaFin = ?, fechaObtencion = ?, nroResolucion = ? WHERE id = ?',
          [this.tipo, this.fecha_inicio, this.fecha_fin, this.fecha_obtencion, this.nro_resolucion, this.id]
        );
        
        if (result.affectedRows === 0) throw new Error('No se encontró el bachillerato para actualizar.');
        
        return this;
      } catch (error) {
        throw new Error(`Error al actualizar bachillerato: ${error.message}`);
      }
    }
  
    static async eliminar(idBachillerato) {
      try {
        const [result] = await execute('DELETE FROM bachillerato WHERE id = ?', [idBachillerato]);
        if (result.affectedRows === 0) throw new Error('No se encontró el bachillerato para eliminar.');
        return idBachillerato;
      } catch (error) {
        throw error;
      }
    }
}

export default Bachillerato;
