import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/eventos/';

const API_URL = `${import.meta.env.VITE_API_URL}/api/eventos/`;

export const obtenerEventos = () => axios.get(API_URL);
export const obtenerEvento = (id) => axios.get(`${API_URL}/${id}`);
export const obtenerEventoCodigoCoordinador = (codigo_coordinador) => axios.get(`${API_URL}/coordinador/${codigo_coordinador}`);
export const crearEvento = (evento) => axios.post(API_URL, evento);
export const actualizarEvento = (id, evento) => axios.put(`${API_URL}/${id}`, evento);
export const eliminarEvento = (id) => axios.delete(`${API_URL}/${id}`);