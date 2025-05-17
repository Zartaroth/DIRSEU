import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/talleres/';

const API_URL = `${import.meta.env.VITE_API_URL}/api/talleres/`;

// Obtener todos los talleres
export const obtenerTalleres = () => axios.get(API_URL);

// Obtener un taller por ID
export const obtenerTaller = (id) => axios.get(`${API_URL}/${id}`);

// Crear un nuevo taller
export const crearTaller = (taller) => axios.post(API_URL, taller);

// Actualizar un taller existente
export const actualizarTaller = (id, taller) => axios.put(`${API_URL}/${id}`, taller);

// Eliminar un taller
export const eliminarTaller = (id) => axios.delete(`${API_URL}/${id}`);

// Obtener talleres por código del instructor
export const obtenerTalleresPorCodigoInstructor = (codigo_instructor) => 
  axios.get(`${API_URL}instructor/${codigo_instructor}`);
