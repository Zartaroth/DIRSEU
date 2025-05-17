import { execute, query } from "../utils/db.js";

class TituloProfesional {
    constructor(titulo) {
      this.id = titulo.id;
      this.id_egresado = titulo.idEgresado;
      this.titulo = titulo.titulo;
      this.fecha_sustentacion = titulo.fechaSustentacion;
      this.modalidad_obtencion = titulo.modalidadObtencion;
      this.fecha_obtencion = titulo.fechaObtencionTitulo;
      this.nro_resolucion = titulo.nroResolucion;
    }
  
    static async crear(nuevoTitulo) {
      try {
        const [result] = await execute(
          'INSERT INTO titulo_profesional (idEgresado, titulo, fechaSustentacion, modalidadObtencion, fechaObtencionTitulo, nroResolucion) VALUES (?, ?, ?, ?, ?, ?)',
          [
            nuevoTitulo.id_egresado,
            nuevoTitulo.titulo,
            nuevoTitulo.fecha_sustentacion,
            nuevoTitulo.modalidad_obtencion,
            nuevoTitulo.fecha_obtencion,
            nuevoTitulo.nro_resolucion,
          ]
        );
        const [tituloRows] = await execute('SELECT * FROM titulo_profesional WHERE id = ?', [result.insertId]);
        return new TituloProfesional(tituloRows[0]);
      } catch (error) {
        throw error;
      }
    }

    // Obtener todas las titulos profesionales
    static async obtenerTodos() {
        try {
        const titulos = await query('SELECT * FROM titulo_profesional');
        return titulos.map(exp => new TituloProfesional(exp));
        } catch (error) {
        console.error('Error en obtenerTodos:', error);
        throw error;
        }
    }

    // Obtener experiencias laborales por ID
    static async obtenerPorId(id) {
        const [titulos] = await execute('SELECT * FROM titulo_profesional WHERE id = ?', [id]);
        if (titulos.length === 0) return null;
        return new TituloProfesional(titulos[0]);
    }
  
    static async obtenerPorEgresado(idEgresado) {
      const [titulos] = await execute('SELECT * FROM titulo_profesional WHERE idEgresado = ?', [idEgresado]);
      return titulos.map(t => new TituloProfesional(t));
    }
  
    async actualizar() {
      try {
        console.log("Datos recibidos para actualizar:", this);
    
        const [result] = await execute(
          'UPDATE titulo_profesional SET titulo = ?, fechaSustentacion = ?, modalidadObtencion = ?, fechaObtencionTitulo = ?, nroResolucion = ? WHERE id = ?',
          [this.titulo, this.fecha_sustentacion, this.modalidad_obtencion, this.fecha_obtencion, this.nro_resolucion, this.id]
        );
    
        if (result.affectedRows === 0) {
          throw new Error('No se encontró el título profesional para actualizar.');
        }
        
        return this;
      } catch (error) {
        throw new Error(`Error al actualizar título profesional: ${error.message}`);
      }
    }
  
    static async eliminar(id) {
      try {
        const [result] = await execute('DELETE FROM titulo_profesional WHERE id = ?', [id]);
        if (result.affectedRows === 0) throw new Error('No se encontró el título profesional para eliminar.');
        return id;
      } catch (error) {
        throw error;
      }
    }
}

export default TituloProfesional;