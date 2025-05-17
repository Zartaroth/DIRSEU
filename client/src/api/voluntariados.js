import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/voluntariados';

const API_URL = `${import.meta.env.VITE_API_URL}/api/voluntariados/`;

export const obtenerVoluntariados = () => axios.get(API_URL);
export const obtenerVoluntariado = (id) => axios.get(`${API_URL}/${id}`);
export const crearVoluntariado = (voluntariado) => axios.post(API_URL, voluntariado);
export const actualizarVoluntariado = (id, voluntariado) => axios.put(`${API_URL}/${id}`, voluntariado);
export const eliminarVoluntariado = (id) => axios.delete(`${API_URL}/${id}`);
