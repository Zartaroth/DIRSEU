import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/sesiones'; // Ajusta la URL según tu configuración

const API_URL = `${import.meta.env.VITE_API_URL}/api/sesiones/`;

// Obtener todas las sesiones por ID de taller
export const getSesionesByTallerId = async (idTaller) => {
    try {
        const response = await axios.get(`${API_URL}/taller/${idTaller}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo sesiones por ID de taller:', error);
        throw error;
    }
};

// Obtener una sesión por su ID
export const getSesionById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo sesión por ID:', error);
        throw error;
    }
};

// Crear una nueva sesión
export const createSesion = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error creando sesión:', error);
        throw error;
    }
};

// Actualizar una sesión existente
export const updateSesion = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error actualizando sesión:', error);
        throw error;
    }
};

// Eliminar una sesión
export const deleteSesion = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando sesión:', error);
        throw error;
    }
};
