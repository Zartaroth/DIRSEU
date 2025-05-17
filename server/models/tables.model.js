import { pool } from '../utils/db.js';

export const getTableRequest = async (table) => {

    // Asegúrate de que el nombre de la tabla sea seguro
    const validTables = ['talleres', 'capacitaciones', 'ofertas_laborales', 'voluntariados']; // Lista de tablas válidas
    if (!validTables.includes(table)) {
        throw new Error('Invalid table name');
    }

    // Construir dinámicamente la consulta SQL
    const query = `SELECT * FROM ${table}`;

    const [rows] = await pool.query(query);
    return rows;
};

export const getTableByIdRequest = async ({ table, id }) => {

    // Asegúrate de que el nombre de la tabla sea seguro
    const validTables = ['talleres', 'capacitaciones', 'ofertas_laborales', 'voluntariados']; // Lista de tablas válidas
    if (!validTables.includes(table)) {
        throw new Error('Invalid table name');
    }

    // Construir dinámicamente la consulta SQL
    const query = `SELECT * FROM ${table} WHERE id = ${id}`;

    const [rows] = await pool.query(query);
    return rows[0];
};

export const getUsersInscriptionRequest = async (table, id) => {
    // Asegúrate de que el nombre de la tabla sea seguro
    const validTables = ['talleres', 'capacitaciones', 'ofertas_laborales', 'voluntariados']; // Lista de tablas válidas

    if (!validTables.includes(table)) {
        throw new Error('Invalid table name');
    }

    const entity_id_column = 'entidad_id'; // Nombre de la columna que almacena el ID de la entidad en las tablas de inscripciones
    // Construir dinámicamente la consulta SQL
    const query = `
        SELECT 
            CONCAT(users.firstName, ' ', users.lastName) AS Nombre,
            estudiantes.codigo AS Codigo,
            estudiantes.carrera AS Carrera,
            estudiantes.semestre AS Semestre,
                inscripciones.fecha_inscripcion AS Fecha_Inscripcion,
            inscripciones.estado AS Estado
        FROM 
            inscripciones_${table} AS inscripciones
        JOIN 
            estudiantes ON inscripciones.estudiante_id = estudiantes.id
        JOIN 
            users ON estudiantes.user_id = users.id
        WHERE 
            inscripciones.${entity_id_column} = ?;`;

    const [rows] = await pool.query(query, [id]);
    return rows;
};


// Función para buscar un usuario por correo electrónico
export const getInscriptionByUserId = async ({ table, entidad_id, estudiante_id }) => {
    try {
        // Asegúrate de que el nombre de la tabla sea seguro
        const validTables = ['talleres', 'voluntariados']; // Lista de tablas válidas

        if (!validTables.includes(table)) {
            throw new Error('Invalid table name');
        }

        // Construir dinámicamente la consulta SQL
        const query = `
        SELECT * FROM
            inscripciones_${table}
        WHERE 
            entidad_id = ? AND estudiante_id = ? ;`;

        const [rows] = await pool.query(query, [entidad_id, estudiante_id]);

        return rows[0];
    } catch (error) {
        throw new Error('Fallo al registrar Inscripcion.');
    }
};

export const registerInscriptionRequest = async ({ table, entidad_id, estudiante_id }) => {
    try {
        // Asegúrate de que el nombre de la tabla sea seguro
        const validTables = ['talleres', 'voluntariados']; // Lista de tablas válidas

        if (!validTables.includes(table)) {
            throw new Error('Nombre de la tabla invalida');
        }

        // Construir dinámicamente la consulta SQL
        const query = `
        INSERT INTO
            inscripciones_${table} (entidad_id, estudiante_id, fecha_inscripcion, estado)
        VALUES 
        (?, ?, NOW(), 'pendiente');`;

        await pool.query(query, [entidad_id, estudiante_id]);

        // Devuelve una respuesta de éxito
        return { success: true, message: 'Inscripcion Registrada.' };
    } catch (error) {
        throw new Error('Fallo al registrar Inscripcion.');
    }
};

export const registerInscriptionEgresadoRequest = async ({table, entidad_id, egresado_id }) => {
    try {
        const validTables = ['capacitaciones', 'ofertas_laborales'];

        if (!validTables.includes(table)) {
            throw new Error('Invalid table name');
        }

        const query = `
        INSERT INTO
            inscripciones_${table} (entidad_id, egresado_id, fecha_inscripcion, estado)
        VALUES 
        (?, ?, NOW(), 'pendiente');`;

        await pool.query(query, [entidad_id, egresado_id]);

        return { success: true, message: 'Inscripcion Registrada.' };
    } catch (error) {
        throw new Error('Fallo al registrar Inscripcion.');
    }
};

export const getInscriptionByUserEgresanteId = async ({ table, entidad_id, egresado_id }) => {
    try {
        // Asegúrate de que el nombre de la tabla sea seguro
        const validTables = ['capacitaciones', 'ofertas_laborales']; // Lista de tablas válidas

        if (!validTables.includes(table)) {
            throw new Error('Invalid table name');
        }

        // Construir dinámicamente la consulta SQL
        const query = `
        SELECT * FROM
            inscripciones_${table}
        WHERE 
            entidad_id = ? AND egresado_id = ? ;`;

        const [rows] = await pool.query(query, [entidad_id, egresado_id]);

        return rows[0];
    } catch (error) {
        throw new Error('Fallo al registrar Inscripcion.');
    }
};

export const getEgresadosInscriptionRequest = async (table, id) => {
    // Asegúrate de que el nombre de la tabla sea seguro
    const validTables = ['capacitaciones', 'ofertas_laborales']; // Lista de tablas válidas

    if (!validTables.includes(table)) {
        throw new Error('Nombre de la tabla invalida');
    }

    const entity_id_column = 'entidad_id'; // Nombre de la columna que almacena el ID de la entidad en las tablas de inscripciones

    // Construir dinámicamente la consulta SQL
    const query = `
        SELECT 
            CONCAT(users.firstName, ' ', users.lastName) AS Nombre,
            egresados.codigo AS Codigo,
            egresados.carrera AS Carrera,
            egresados.promocion AS Promocion,
            egresados.telefono AS Telefono,
            egresados.direccion AS Direccion,
            inscripciones.estado AS Estado
        FROM 
            inscripciones_${table} AS inscripciones
        JOIN 
            egresados ON inscripciones.egresado_id = egresados.id
        JOIN 
            users ON egresados.user_id = users.id
        WHERE 
            inscripciones.${entity_id_column} = ?;`;

    try {
        // Ejecutar la consulta
        const [rows] = await pool.query(query, [id]);
        return rows; // Retornar las filas obtenidas
    } catch (error) {
        throw new Error(`Error al obtener inscripciones de ${table}: ${error.message}`);
    }
};

// Visualizar los nombres y apellios de los inscritos de cada taller 
export const getTallerUsersRequest = async (tallerId) => {
    // Verifica que el ID del taller sea válido
    if (!tallerId || isNaN(tallerId)) {
        throw new Error('Invalid taller ID');
    }

    // Consulta SQL con el ID del estudiante incluido
    const query = `
        SELECT 
            estudiantes.id AS estudiante_id, 
            CONCAT(users.firstName, ' ', users.lastName) AS Nombre
        FROM 
            inscripciones_talleres AS inscripciones
        JOIN 
            estudiantes ON inscripciones.estudiante_id = estudiantes.id
        JOIN 
            users ON estudiantes.user_id = users.id
        WHERE 
            inscripciones.entidad_id = ?;
    `;

    // Ejecuta la consulta y retorna los resultados
    const [rows] = await pool.query(query, [tallerId]);
    return rows;
};