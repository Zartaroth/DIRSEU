import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/preguntas';

const API_URL = `${import.meta.env.VITE_API_URL}/api/preguntas/`;

// Obtener todas las preguntas por ID de encuesta
export const getPreguntasByEncuestaId = async (encuestaId) => {
    try {
      const response = await axios.get(`${API_URL}/encuesta/${encuestaId}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo preguntas:', error);
      throw error;
    }
};

// Obtener una pregunta por ID
export const getPreguntaById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Crear una nueva pregunta
export const createPregunta = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// Actualizar una pregunta existente
export const updatePregunta = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Eliminar una pregunta
export const deletePregunta = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};