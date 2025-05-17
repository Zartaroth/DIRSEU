import { createPool } from 'mysql2/promise';
import configs from '../config/config.js';

export const pool = new createPool({
    host: configs.DB_HOST,
    user: configs.DB_USER,
    password: configs.DB_PASSWORD,
    database: configs.DB_NAME,
    port: configs.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export const execute = async (sql, params) => {
    const [rows, fields] = await pool.execute(sql, params);
    return [rows, fields];
  };
  
  export const query = async (query, params) => {
    const [results] = await pool.query(query, params);
    return results;
};


// Middleware para manejar errores de conexión
pool.on("error", (err) => {
    console.error("Error en el pool de conexiones MySQL", err);
});

// Evento para manejar conexiones exitosas
pool.on("acquire", (connection) => {
    // console.log(`Conexión ${connection.threadId} adquirida del pool`);
});
