import { execute, query } from '../utils/db.js';

class FormacionAcademica {
  constructor(formacion) {
    this.id = formacion.id;
    this.id_egresado = formacion.id_egresado;
    this.institucion = formacion.institucion;
    this.titulo = formacion.titulo;
    this.descripcion = formacion.descripcion;
    this.fecha_inicio = formacion.fecha_inicio;
    this.fecha_fin = formacion.fecha_fin;
  }

  // Validación para asegurarse de que la fecha_inicio no sea posterior a la fecha_fin
  static validarFechas(fecha_inicio, fecha_fin) {
    if (new Date(fecha_inicio) > new Date(fecha_fin)) {
      throw new Error('La fecha de inicio no puede ser posterior a la fecha de finalización.');
    }
  }

  // Crear una nueva formación académica
  static async crear(nuevaFormacion) {
    try {
      // Validar las fechas antes de crear la formación
      FormacionAcademica.validarFechas(nuevaFormacion.fecha_inicio, nuevaFormacion.fecha_fin);

      const [result] = await execute(
        'INSERT INTO formacion_academica (id_egresado, institucion, titulo, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?, ?)',
        [
          nuevaFormacion.id_egresado,
          nuevaFormacion.institucion,
          nuevaFormacion.titulo,
          nuevaFormacion.descripcion || null,
          nuevaFormacion.fecha_inicio,
          nuevaFormacion.fecha_fin,
        ]
      );

      const [formacionRows] = await execute('SELECT * FROM formacion_academica WHERE id = ?', [result.insertId]);

      if (formacionRows.length === 0) {
        throw new Error('Formación no encontrada después de la inserción.');
      }

      return new FormacionAcademica(formacionRows[0]);
    } catch (error) {
      console.error('Error en FormacionAcademica.crear:', error);
      throw error;
    }
  }

  // Obtener todas las formaciones académicas por id_egresado
  static async obtenerPorEgresado(id_egresado) {
    try {
      const formaciones = await query('SELECT * FROM formacion_academica WHERE id_egresado = ?', [id_egresado]);
  
      // Si no se encuentran registros, devuelve un mensaje indicando que no hay registros
      if (!formaciones || formaciones.length === 0) {
        return { message: "No hay registros de formación académica para este egresado." };
      }
  
      // Si hay registros, devuelve los mapeados en instancias de FormacionAcademica
      return formaciones.map(formacion => new FormacionAcademica(formacion));
    } catch (error) {
      // Si ocurre un error, captura el error y lo imprime en consola
      console.error('Error en obtenerPorEgresado:', error);
  
      // Retorna un mensaje de error genérico
      return { message: "Error al procesar la solicitud." };
    }
  }

  // Obtener todas las formaciones académicas
  static async obtenerTodas() {
    try {
      const formaciones = await query('SELECT * FROM formacion_academica');
      return formaciones.map(formacion => new FormacionAcademica(formacion));
    } catch (error) {
      console.error('Error en obtenerTodas:', error);
      throw error;
    }
  }

  // Obtener una formación académica específica por ID
  static async obtenerPorId(id) {
    try {
      const [formaciones] = await execute('SELECT * FROM formacion_academica WHERE id = ?', [id]);
      if (formaciones.length === 0) return null;
      return new FormacionAcademica(formaciones[0]);
    } catch (error) {
      console.error('Error en obtenerPorId:', error);
      throw error;
    }
  }

  // Actualizar una formación académica existente
  async actualizar() {
    try {
      await execute(
        'UPDATE formacion_academica SET institucion = ?, titulo = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ?',
        [
          this.institucion,
          this.titulo,
          this.descripcion,
          this.fecha_inicio,
          this.fecha_fin,
          this.id
        ]
      );
    } catch (error) {
      console.error('Error en FormacionAcademica.actualizar:', error);
      throw error;
    }
  }

  // Eliminar una formación académica por ID
  async eliminar() {
    try {
      await execute('DELETE FROM formacion_academica WHERE id = ?', [this.id]);
    } catch (error) {
      console.error('Error en FormacionAcademica.eliminar:', error);
      throw error;
    }
  }
}

export default FormacionAcademica;
