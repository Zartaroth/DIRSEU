import axios from 'axios';

// Configura la URL de la API
// const API_URL = 'http://localhost:4000/api/opciones_pregunta';

const API_URL = `${import.meta.env.VITE_API_URL}/api/opciones_pregunta/`;

// Obtener todas las opciones por ID de pregunta
export const getOpcionesByPreguntaId = async (preguntaId) => {
  try {
    const response = await axios.get(`${API_URL}/pregunta/${preguntaId}`);
    return response.data;  // Retorna las opciones asociadas a la pregunta
  } catch (error) {
    console.error('Error obteniendo las opciones:', error);
    throw error;
  }
};

// Obtener una opción por ID
export const getOpcionById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;  // Retorna la opción específica
  } catch (error) {
    console.error('Error obteniendo la opción:', error);
    throw error;
  }
};

// Crear una nueva opción
export const createOpcion = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;  // Retorna los datos de la opción creada
  } catch (error) {
    console.error('Error creando la opción:', error);
    throw error;
  }
};

// Actualizar una opción existente
export const updateOpcion = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;  // Retorna los datos de la opción actualizada
  } catch (error) {
    console.error('Error actualizando la opción:', error);
    throw error;
  }
};

// Eliminar una opción
export const deleteOpcion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;  // Retorna la respuesta de la eliminación
  } catch (error) {
    console.error('Error eliminando la opción:', error);
    throw error;
  }
};
