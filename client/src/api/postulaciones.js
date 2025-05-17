import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/postulaciones'; // Cambia la URL según tu configuración

const API_URL = `${import.meta.env.VITE_API_URL}/api/postulaciones/`;

// Crear una nueva postulación
export const createPostulacion = async (postulacionData) => {
  const response = await axios.post(`${API_URL}/`, postulacionData);
  return response.data;
};

// Obtener todas las postulaciones de una oferta laboral
export const getPostulacionesByOferta = async (ofertaId) => {
  const response = await axios.get(`${API_URL}/oferta/${ofertaId}`);
  return response.data;
};

// Obtener todas las postulaciones de un egresado
export const getPostulacionesByEgresado = async (egresadoId) => {
  const response = await axios.get(`${API_URL}/egresado/${egresadoId}`);
  return response.data;
};

// Obtener todas las postulaciones
export const getAllPostulaciones = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Obtener una postulación específica por ID
export const getPostulacionById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Actualizar una postulación
export const updatePostulacion = async (id, postulacionData) => {
  const response = await axios.put(`${API_URL}/${id}`, postulacionData);
  return response.data;
};

// Eliminar una postulación
export const deletePostulacion = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
