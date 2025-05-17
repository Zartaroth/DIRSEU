import { execute, query } from '../utils/db.js';

const RespuestaDetalle = {
    // Obtener todos los detalles de una respuesta
    getAllByRespuestaId: async (respuesta_id) => {
        try {
            const results = await query(`
                SELECT * FROM respuestas_detalles WHERE respuesta_id = ?`, 
                [respuesta_id]
            );
            return results;
        } catch (error) {
            throw new Error(`Error al obtener los detalles de la respuesta: ${error.message}`);
        }
    },

    // Obtener un detalle específico por ID
    getById: async (id) => {
        try {
            const results = await query('SELECT * FROM respuestas_detalles WHERE id = ?', [id]);
            return results[0];
        } catch (error) {
            throw new Error(`Error al obtener el detalle con ID ${id}: ${error.message}`);
        }
    },

    // Crear un nuevo detalle de respuesta
    create: async ({ respuesta_id, pregunta_id, opcion_id, respuesta_texto, respuesta_numerica }) => {
        try {
            const sql = `
                INSERT INTO respuestas_detalles (respuesta_id, pregunta_id, opcion_id, respuesta_texto, respuesta_numerica)
                VALUES (?, ?, ?, ?, ?)
            `;
            const [result] = await execute(sql, [respuesta_id, pregunta_id, opcion_id, respuesta_texto, respuesta_numerica]);
            return result.insertId;
        } catch (error) {
            throw new Error(`Error al crear el detalle de la respuesta: ${error.message}`);
        }
    },

    // Eliminar un detalle de respuesta
    delete: async (id) => {
        try {
            const sql = 'DELETE FROM respuestas_detalles WHERE id = ?';
            const [result] = await execute(sql, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw new Error(`Error al eliminar el detalle con ID ${id}: ${error.message}`);
        }
    }
};

export default RespuestaDetalle;
