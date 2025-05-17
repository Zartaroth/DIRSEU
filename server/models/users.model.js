import axios from 'axios';
import bcrypt from 'bcrypt';
import { pool } from '../utils/db.js';

const MAILBOXLAYER_ACCESS_KEY = '9d6a620c75f125f9ba4c778e7abf5bb7';  // Colocar el access key aquí

export const verifyEmailWithMailboxLayer = async (email) => {
    try {
        const response = await axios.get('http://apilayer.net/api/check', {
            params: {
                access_key: MAILBOXLAYER_ACCESS_KEY,
                email: email
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al verificar el correo electrónico.');
    }
};

// Función para registrar un nuevo usuario
export const registerUser = async ({ firstName, lastName, email, password, role }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO users (firstName, lastName, email, password, role) VALUES (?, ?, ?, ?, ?)', 
            [firstName, lastName, email, hashedPassword, role]
        );

        // Devuelve una respuesta de éxito
        return { success: true, message: 'User registered successfully.' };
    } catch (error) {
        throw new Error('Failed to register user.');
    }
};

// Función para buscar un usuario por correo electrónico
export const getUserByEmail = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

export const getUserByID = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
};

// Función para comparar la contraseña proporcionada con la almacenada en la base de datos
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};


export const getDataByEmail = async (email) => {
    try {

        // Probar si es estudiante
        let [rows] = await pool.query('SELECT * FROM users u INNER JOIN estudiantes e ON e.user_id = u.id WHERE u.email = ?', [email]);
        if (rows[0]) {
            return { type: 'estudiante', ...rows[0] };
        }

        // Probar si es egresado
        [rows] = await pool.query('SELECT * FROM users u INNER JOIN egresados e ON e.user_id = u.id WHERE u.email = ?', [email]);

        if (rows[0]) {
            return { type: 'egresado', ...rows[0] };
        }

        // Probar si es docente
        [rows] = await pool.query('SELECT * FROM users u INNER JOIN docentes d ON d.user_id = u.id WHERE u.email = ?', [email]);

        if (rows[0]) {
            return { type: 'docente', ...rows[0] };
        }
        // Probar si es coordinador
        [rows] = await pool.query('SELECT * FROM users u INNER JOIN coordinadores c ON c.user_id = u.id WHERE u.email = ?', [email]);

        if (rows[0]) {
            return { type: 'coordinador', ...rows[0] };
        }
        // Probar si es empleador
        [rows] = await pool.query('SELECT * FROM users u INNER JOIN empleadores e ON e.user_id = u.id WHERE u.email = ?', [email]);

        if (rows[0]) {
            return { type: 'empleador', ...rows[0] };
        }
        // Probar si es instructor
        [rows] = await pool.query('SELECT * FROM users u INNER JOIN instructores e ON e.user_id = u.id WHERE u.email = ?', [email]);

        if (rows[0]) {
            return { type: 'instructor', ...rows[0] };
        }

    } catch (error) {
        throw new Error('Failed to obtain info user.');
    }
}

export const registerStudent = async ({ codigo, matricula, carrera, semestre, fecha_nacimiento, telefono, direccion, user_id }) => {
    try {
        // Insertar datos en la tabla de estudiantes
        await pool.query('INSERT INTO estudiantes (codigo, matricula, carrera, semestre, fecha_nacimiento, telefono, direccion, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [codigo, matricula, carrera, semestre, fecha_nacimiento, telefono, direccion, user_id]);

        // Devuelve una respuesta de éxito
        return { success: true, message: 'Student registered successfully.' };
    } catch (error) {
        throw new Error('Failed to register student.');
    }
};

export const registerEgresado = async ({ codigo, carrera, promocion, telefono, direccion, user_id }) => {
    try {
        // Insertar datos en la tabla de estudiantes
        await pool.query('INSERT INTO egresados (codigo, carrera, promocion, telefono, direccion, user_id) VALUES (?, ?, ?, ?, ?, ?)', [codigo, carrera, promocion, telefono, direccion, user_id]);

        // Devuelve una respuesta de éxito
        return { success: true, message: 'Egresado registered successfully.' };
    } catch (error) {
        throw new Error('Failed to register egresado.');
    }
};

export const registerDocente = async ({ codigo_docente, departamento, telefono, direccion, user_id }) => {
    try {
        await pool.query('INSERT INTO docentes (codigo_docente, departamento, telefono, direccion, user_id) VALUES (?, ?, ?, ?, ?)', [codigo_docente, departamento, telefono, direccion, user_id]);
        return { success: true, message: 'Docente registrado exitosamente.' };
    } catch (error) {
        throw new Error('Error al registrar el docente.');
    }
};

export const registerEmpleador = async ({ user_id, codigo_empleador, nombre_empresa, telefono, direccion_empresa, area_negocio, email_empresa }) => {
    try {
        await pool.query(
            'INSERT INTO empleadores (user_id, codigo_empleador, nombre_empresa, telefono, direccion_empresa, area_negocio, email_empresa, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())', 
            [user_id, codigo_empleador, nombre_empresa, telefono, direccion_empresa, area_negocio, email_empresa]
        );
        return { success: true, message: 'Empleador registrado exitosamente.' };
    } catch (error) {
        throw new Error('Error al registrar el empleador.');
    }
};

// Función para cambiar la contraseña de un usuario
export const changeUserPassword = async (userId, currentPassword, newPassword) => {
    try {
        // Obtener el usuario por su ID
        const [rows] = await pool.query('SELECT password FROM users WHERE id = ?', [userId]);
        const user = rows[0];

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Verificar que la contraseña actual coincida
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new Error('La contraseña actual es incorrecta');
        }

        // Validar la longitud de la nueva contraseña (ejemplo: mínimo 8 caracteres)
        if (newPassword.length < 8) {
            throw new Error('La nueva contraseña debe tener al menos 8 caracteres');
        }

        // Hashear la nueva contraseña
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña en la base de datos
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, userId]);

        return { success: true, message: 'Contraseña cambiada exitosamente' };
    } catch (error) {
        throw new Error(error.message || 'Error al cambiar la contraseña');
    }
};
