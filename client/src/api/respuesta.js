import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/respuestas'; // Cambia el puerto si es necesario

const API_URL = `${import.meta.env.VITE_API_URL}/api/respuestas/`;

// Obtener todas las respuestas por ID de encuesta
export const getRespuestasByEncuestaId = async (encuestaId) => {
  try {
    const response = await axios.get(`${API_URL}/encuesta/${encuestaId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo respuestas por encuesta:', error);
    throw error;
  }
};

// Obtener todas las respuestas por ID de pregunta
export const getRespuestasByPreguntaId = async (preguntaId) => {
  try {
    const response = await axios.get(`${API_URL}/pregunta/${preguntaId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo respuestas por pregunta:', error);
    throw error;
  }
};

// Obtener una respuesta por ID
export const getRespuestaById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo respuesta por ID:', error);
    throw error;
  }
};

// Crear una nueva respuesta
export const createRespuesta = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error creando respuesta:', error);
    throw error;
  }
};

// Actualizar una respuesta existente
export const updateRespuesta = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error actualizando respuesta:', error);
    throw error;
  }
};

// Eliminar una respuesta
export const deleteRespuesta = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando respuesta:', error);
    throw error;
  }
};
