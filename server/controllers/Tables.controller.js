import { getTableRequest, getTableByIdRequest, getUsersInscriptionRequest, 
    getInscriptionByUserId, registerInscriptionRequest, registerInscriptionEgresadoRequest, 
    getInscriptionByUserEgresanteId, getEgresadosInscriptionRequest,
    getTallerUsersRequest } from "../models/tables.model.js";

export const getTables = async (req, res) => {
    try {

        const { table } = req.body;

        if (!!!table) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        const rows = await getTableRequest(table);

        res.status(200).json(
            {
                statusCode: 200,
                rows: rows
            });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: error.message,
        });
    }
}

export const getModule = async (req, res) => {
    try {

        const { table, id } = req.body;

        if (!!!table || !!!id) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        const data = await getTableByIdRequest({ table, id });


        if (!data) {
            return {
                statusCode: 400,
                error: 'No Existe Modulo'

            };
        }

        // console.log(data);
        res.status(200).json(
            {
                statusCode: 200,
                data: data
            });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: error.message,
        });
    }
}

export const getUsersByInscription = async (req, res) => {
    try {

        const { table, id } = req.body;

        if (!!!table || !!!id) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        const rows = await getUsersInscriptionRequest(table, id);

        res.status(200).json(
            {
                statusCode: 200,
                rows: rows
            });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: error.message,
        });
    }
}

export const registerIncription = async (req, res) => {
    try {

        const { table, entidad_id, estudiante_id } = req.body;

        if (!!!table || !!!entidad_id || !!!estudiante_id) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        const exists = await getInscriptionByUserId({ table, entidad_id, estudiante_id });

        if (exists) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Ya se realizo una Inscripcion Previa'
            });
        }

        await registerInscriptionRequest({ table, entidad_id, estudiante_id });

        res.status(200).json({
            statusCode: 200,
            message: 'Se Registro Inscripcion Exitosamente',
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: error.message,
        });
    }
}

export const registerIncriptionEgresados = async (req, res) => {
    try {

        const { table, entidad_id, egresado_id } = req.body;

        if (!!!table || !!!entidad_id || !!!egresado_id) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        const exists = await getInscriptionByUserEgresanteId({ table, entidad_id, egresado_id });

        if (exists) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Ya se realizo una Inscripcion Previa'
            });
        }

        await registerInscriptionEgresadoRequest({ table, entidad_id, egresado_id });

        res.status(200).json({
            statusCode: 200,
            message: 'Se Registro Inscripcion Exitosamente',
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            error: error.message,
        });
    }
}

export const getEgresadosByInscription = async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { table, id } = req.body;

        // Validar que los campos sean proporcionados
        if (!table || !id) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        // Obtener las inscripciones de los egresados
        const rows = await getEgresadosInscriptionRequest(table, id);

        // Responder con las inscripciones obtenidas
        res.status(200).json({
            statusCode: 200,
            rows: rows
        });
    } catch (error) {
        // Manejo de errores
        return res.status(500).json({
            statusCode: 500,
            error: error.message,
        });
    }
};

// Para visualizar los nombres y apellios de los inscritos de cada taller 
export const getTallerUsersController = async (req, res) => {
    try {
        // Obtén el ID del taller desde los parámetros de la URL
        const { tallerId } = req.params;

        // Validación básica del ID
        if (!tallerId || isNaN(tallerId)) {
            return res.status(400).json({ error: 'Invalid taller ID' });
        }

        // Llama al servicio para obtener los usuarios inscritos en el taller
        const estudiantes = await getTallerUsersRequest(Number(tallerId));

        // Retorna los resultados
        res.status(200).json({ success: true, data: estudiantes });
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener los estudiantes inscritos:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};