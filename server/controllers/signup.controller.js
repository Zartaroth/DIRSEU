import { getUserByEmail, registerUser, verifyEmailWithMailboxLayer , 
    registerStudent, registerEgresado, registerDocente, registerEmpleador } from '../models/users.model.js';

export async function createUser(userData) {
    try {
        const { firstName, lastName, email, password, role } = userData;

        // Verificar que todos los campos requeridos estén presentes
        if (!firstName || !lastName || !email || !password) {
            return {
                statusCode: 400,
                error: 'Todos los campos son requeridos'
            };
        }

        // Verificar si el usuario ya existe en la base de datos
        const exists = await getUserByEmail(email);
        if (exists) {
            return {
                statusCode: 400,
                error: 'El Usuario Ya Existe'
            };
        }

        // Verificar el correo con MailboxLayer
        const emailCheck = await verifyEmailWithMailboxLayer(email);

        // Validar el formato del correo y la verificación SMTP
        if (!emailCheck.format_valid || !emailCheck.smtp_check) {
            return {
                statusCode: 400,
                error: 'Correo electrónico no válido o no existe.'
            };
        }

        // Registrar al usuario si el correo es válido
        await registerUser({ firstName, lastName, email, password, role });

        return {
            statusCode: 200,
            message: 'Usuario Creado Exitosamente',
        };
    } catch (error) {
        return { statusCode: 500, message: error.message };
    }
}

export const createStudent = async (req, res) => {
    try {
        const { codigo, matricula, carrera, semestre, fecha_nacimiento, telefono, direccion } = req.body;
        if (!!!codigo || !!!matricula || !!!carrera || !!!semestre || !!!fecha_nacimiento) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }
        // Crear Usuario 
        const user = await createUser(req.body);
        // Verficar Error de creacion de usuario
        if (user.error) {
            return res.status(400).json(user);
        }
        const exists = await getUserByEmail(req.body.email);
        // Verificar si el usuario se creo
        if (!exists) {
            return res.status(400).json({
                statusCode: 400,
                error: 'El Usuario No pudo crearse'
            });
        }
        // Llama a la función para registrar al estudiante
        await registerStudent({ codigo, matricula, carrera, semestre, fecha_nacimiento, telefono, direccion, user_id: exists.id });

        res.status(200).json({
            statusCode: 200,
            message: 'Estudiante creado exitosamente',
        });
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: error.message });
    }
};

export const createEgresado = async (req, res) => {
    try {
        const { codigo, carrera, promocion, telefono, direccion } = req.body;
        if (!!!codigo || !!!carrera || !!!promocion) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }
        // Crear Usuario 
        const user = await createUser(req.body);
        // Verficar Error de creacion de usuario
        if (user.error) {
            return res.status(400).json(user);
        }
        const exists = await getUserByEmail(req.body.email);
        // Verificar si el usuario se creo
        if (!exists) {
            return res.status(400).json({
                statusCode: 400,
                error: 'El Usuario No pudo crearse'
            });
        }
        // Llama a la función para registrar al estudiante
        await registerEgresado({ codigo, carrera, promocion, telefono, direccion, user_id: exists.id });

        res.status(200).json({
            statusCode: 200,
            message: 'Egresado creado exitosamente',
        });
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: error.message });
    }
};

export const createDocente = async (req, res) => {
    try {
        const { codigo_docente, departamento, telefono, direccion } = req.body;

        if (!!!codigo_docente || !!!departamento) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }
        // Crear Usuario 
        const user = await createUser(req.body);

        // Verficar Error de creacion de usuario
        if (user.error) {
            return res.status(400).json(user);
        }

        const exists = await getUserByEmail(req.body.email);

        // Verificar si el usuario se creo
        if (!exists) {
            return res.status(400).json({
                statusCode: 400,
                error: 'El Usuario No pudo crearse'
            });
        }
        await registerDocente({ codigo_docente, departamento, telefono, direccion, user_id: exists.id });

        res.status(200).json({
            statusCode: 200,
            message: 'Docente creado exitosamente.',
        });
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: error.message });
    }
};

export const createEmpleador = async (req, res) => {
    try {
        const { codigo_empleador, nombre_empresa, telefono, direccion_empresa, area_negocio, email_empresa } = req.body;

        // Validar campos requeridos
        if (!codigo_empleador || !nombre_empresa) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Campos Requeridos'
            });
        }

        // Crear Usuario
        const user = await createUser(req.body);

        // Verificar si hubo un error en la creación del usuario
        if (user.error) {
            return res.status(400).json(user);
        }

        // Verificar si el usuario fue creado exitosamente usando su email
        const exists = await getUserByEmail(req.body.email);

        if (!exists) {
            return res.status(400).json({
                statusCode: 400,
                error: 'El Usuario no pudo crearse'
            });
        }
        // Registrar el empleador en la base de datos
        await registerEmpleador({
            user_id: exists.id,
            codigo_empleador,
            nombre_empresa,
            telefono,
            direccion_empresa,
            area_negocio,
            email_empresa
        });
        // Respuesta exitosa
        res.status(200).json({
            statusCode: 200,
            message: 'Empleador creado exitosamente.',
        });
    } catch (error) {
        // Respuesta en caso de error
        return res.status(500).json({ statusCode: 500, message: error.message });
    }
};
