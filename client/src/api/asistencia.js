import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/asistencias'; // Ajusta la URL según tu configuración

const API_URL = `${import.meta.env.VITE_API_URL}/api/asistencias`;

// Obtener asistencias detalladas por ID de taller y sesión
export const getAsistenciasDetalladas = async (idTaller, idSesion) => {
    try {
        const response = await axios.get(`${API_URL}/taller/${idTaller}/sesion/${idSesion}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo asistencias detalladas:', error);
        throw error;
    }
};

// Obtener todas las asistencias por ID de taller
export const getAsistenciasByTallerId = async (idTaller) => {
    try {
      const response = await axios.get(`${API_URL}/taller/${idTaller}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo asistencias por taller:', error);
      throw error;
    }
};

// Obtener todas las asistencias por ID de taller y fecha
export const getAsistenciasByFechaAndTaller = async (idTaller, fecha) => {
    try {
        const response = await axios.get(`${API_URL}/taller/${idTaller}/fecha/${fecha}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo asistencias:', error);
        throw error;
    }
};

// Obtener una asistencia por ID
export const getAsistenciaById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo asistencia por ID:', error);
        throw error;
    }
};

// Crear una nueva asistencia
export const createAsistencia = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error creando asistencia:', error);
        throw error;
    }
};

// Actualizar el estado de una asistencia
export const updateAsistenciaEstado = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error actualizando asistencia:', error);
        throw error;
    }
};

// Eliminar una asistencia
export const deleteAsistencia = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error eliminando asistencia:', error);
        throw error;
    }
};
