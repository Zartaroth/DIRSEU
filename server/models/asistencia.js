import { execute, query } from '../utils/db.js';

class Asistencia {
  constructor(asistencia) {
    this.id = asistencia.id;
    this.id_taller = asistencia.id_taller;
    this.id_estudiante = asistencia.id_estudiante;
    this.id_sesion = asistencia.id_sesion;
    this.estado = asistencia.estado;
  }

  // Crear una nueva asistencia
  static async crear(nuevaAsistencia) {
    try {
        
        // Validar datos obligatorios
        if (!nuevaAsistencia.id_taller || !nuevaAsistencia.id_estudiante || !nuevaAsistencia.id_sesion || !nuevaAsistencia.estado) {
            throw new Error('Faltan datos obligatorios para crear la asistencia.');
        }

        // Ejecutar la inserción
        const [result] = await execute(
            'INSERT INTO asistencias (id_taller, id_estudiante, id_sesion, estado) VALUES (?, ?, ?, ?)',
            [nuevaAsistencia.id_taller, nuevaAsistencia.id_estudiante, nuevaAsistencia.id_sesion, nuevaAsistencia.estado]
        );

        // Retornar un objeto básico con el id insertado
        if (result.insertId) {
            return {
                id: result.insertId,
                ...nuevaAsistencia
            };
        } else {
            throw new Error('Error al insertar la asistencia.');
        }
    } catch (error) {
        console.error('Error en Asistencia.crear:', error.message);
        throw error;
    }
  }

  static async obtenerPorFechaYPorTaller(id_taller, fecha) {
    try {
        const queryStr = `
            SELECT a.*
            FROM asistencias a
            INNER JOIN sesiones_taller s ON a.id_sesion = s.id_sesion
            WHERE a.id_taller = ? AND DATE(s.fecha) = ?`;

        const [rows] = await query(queryStr, [id_taller, fecha]);

        // Si rows no es un arreglo, conviértelo en uno
        const results = Array.isArray(rows) ? rows : [rows];

        if (results.length === 0) { 
            return null;
        }

        return results.map(row => new Asistencia(row));
    } catch (error) {
        console.error(`Error al obtener asistencias para el taller con ID ${id_taller} y la fecha ${fecha}:`, error);
        throw error;
    }
  }

  static async obtenerAsistenciasDetalladas(id_taller, id_sesion) {
    try {
        const queryStr = `
            SELECT 
                a.id_sesion,
                t.nombre AS taller,
                s.fecha AS fecha,
                a.id_estudiante,
                CONCAT(u.firstName, ' ', u.lastName) AS nombre_completo_estudiante,
                a.estado
            FROM asistencias a
            INNER JOIN talleres t ON a.id_taller = t.id
            INNER JOIN estudiantes e ON a.id_estudiante = e.id
            INNER JOIN users u ON e.user_id = u.id
            INNER JOIN sesiones_taller s ON a.id_sesion = s.id_sesion
            WHERE a.id_taller = ? AND a.id_sesion = ?`;

        const rows = await query(queryStr, [id_taller, id_sesion]);

        if (!Array.isArray(rows) || rows.length === 0) {
            console.log("No se encontraron asistencias para el taller y sesión especificados.");
            return { mensaje: "No se encontraron asistencias para el taller y sesión especificados." };
        }

        // Agrupamos los datos correctamente
        const data = rows.reduce((acc, row) => {
            const { id_sesion, taller, fecha, id_estudiante, nombre_completo_estudiante, estado } = row;

            // Busca si la sesión ya existe en la agrupación
            let sesion = acc.find(s => s.id_sesion === id_sesion);
            if (!sesion) {
                sesion = { 
                    id_sesion,
                    taller,
                    fecha,
                    asistencias: [] 
                };
                acc.push(sesion);
            }

            // Agrega el registro actual a la lista de asistencias
            sesion.asistencias.push({
                id_estudiante,
                nombre_completo_estudiante,
                estado
            });

            return acc;
        }, []);

        return data;
    } catch (error) {
        console.error(`Error al obtener asistencias detalladas para el taller con ID ${id_taller} y la sesión ${id_sesion}:`, error);
        throw error;
    }
  }

  // Obtener todas las asistencias de un taller específico
  static async obtenerAsistenciasPorTaller(id_taller) {
    try {
        const queryStr = `
            SELECT 
                a.id_sesion,
                t.nombre AS taller,
                s.fecha AS fecha,
                CONCAT(u.firstName, ' ', u.lastName) AS nombre_completo_estudiante,
                a.estado
            FROM asistencias a
            INNER JOIN talleres t ON a.id_taller = t.id
            INNER JOIN estudiantes e ON a.id_estudiante = e.id
            INNER JOIN users u ON e.user_id = u.id
            INNER JOIN sesiones_taller s ON a.id_sesion = s.id_sesion
            WHERE a.id_taller = ?`;

        const rows = await query(queryStr, [id_taller]);

        if (!Array.isArray(rows) || rows.length === 0) {
            return { mensaje: "No se encontraron asistencias para el taller especificado." };
        }

        // Reestructuramos los datos
        const data = {
            taller: rows[0]?.taller || "Taller desconocido",
            asistencias: {}
        };

        rows.forEach(row => {
            const { nombre_completo_estudiante, fecha, estado } = row;

            // Aseguramos que el estudiante exista en el objeto
            if (!data.asistencias[nombre_completo_estudiante]) {
                data.asistencias[nombre_completo_estudiante] = {};
            }

            // Asignamos el estado por fecha
            data.asistencias[nombre_completo_estudiante][fecha.toISOString().split('T')[0]] = estado;
        });

        return data;
    } catch (error) {
        console.error(`Error al obtener asistencias para el taller con ID ${id_taller}:`, error);
        throw error;
    }
  }

  // Obtener una asistencia específica por su ID
  static async obtenerPorId(id) {
    try {
      const [rows] = await query('SELECT * FROM asistencias WHERE id = ?', [id]);
      if (rows.length === 0) return null;
      return new Asistencia(rows[0]);
    } catch (error) {
      console.error(`Error al obtener la asistencia con ID ${id}:`, error);
      throw error;
    }
  }

  // Actualizar el estado de una asistencia
  async actualizarEstado(nuevoEstado) {
    try {
      const [result] = await execute(
        'UPDATE asistencias SET estado = ? WHERE id = ?',
        [nuevoEstado, this.id]
      );
      if (result.affectedRows > 0) {
        this.estado = nuevoEstado; // Actualizar el estado en la instancia
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Error al actualizar el estado de la asistencia con ID ${this.id}:`, error);
      throw error;
    }
  }

  // Eliminar una asistencia
  static async eliminar(id) {
    try {
      const [result] = await execute('DELETE FROM asistencias WHERE id = ?', [id]);
      if (result.affectedRows > 0) {
        return id; // Retorna el ID de la asistencia eliminada
      } else {
        throw new Error('Asistencia no encontrada para eliminar.');
      }
    } catch (error) {
      console.error(`Error al eliminar la asistencia con ID ${id}:`, error);
      throw error;
    }
  }
}

export default Asistencia;
