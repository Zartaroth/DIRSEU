import { execute, query } from '../utils/db.js';

const PublicacionEncuesta = {
    // Obtener todas las publicaciones de encuestas
    getAll: async () => {
        try {
            const results = await query('SELECT * FROM publicaciones_encuestas');
            return results;
        } catch (error) {
            throw new Error(`Error al obtener las publicaciones de encuestas: ${error.message}`);
        }
    },

    // Obtener una publicación por ID
    getById: async (id) => {
        try {
            const results = await query('SELECT * FROM publicaciones_encuestas WHERE id = ?', [id]);
            return results[0];
        } catch (error) {
            throw new Error(`Error al obtener la publicación con ID ${id}: ${error.message}`);
        }
    },

    // Crear una nueva publicación de encuesta
    create: async ({ encuesta_id, estado, publico_objetivo, fecha_cierre }) => {
        try {
            const sql = `
                INSERT INTO publicaciones_encuestas (encuesta_id, estado, publico_objetivo, fecha_cierre)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await execute(sql, [encuesta_id, estado, publico_objetivo, fecha_cierre]);
            return result.insertId;
        } catch (error) {
            throw new Error(`Error al crear la publicación de encuesta: ${error.message}`);
        }
    },

    // Actualizar una publicación existente
    update: async (id, { estado, publico_objetivo, fecha_cierre }) => {
        try {
            const sql = `
                UPDATE publicaciones_encuestas 
                SET estado = ?, publico_objetivo = ?, fecha_cierre = ?
                WHERE id = ?
            `;
            const [result] = await execute(sql, [estado, publico_objetivo, fecha_cierre, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al actualizar la publicación con ID ${id}: ${error.message}`);
        }
    },

    // Eliminar una publicación de encuesta
    delete: async (id) => {
        try {
            const sql = 'DELETE FROM publicaciones_encuestas WHERE id = ?';
            const [result] = await execute(sql, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar la publicación con ID ${id}: ${error.message}`);
        }
    }
};

export default PublicacionEncuesta;
