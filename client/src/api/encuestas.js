import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/encuestas';

const API_URL = `${import.meta.env.VITE_API_URL}/api/encuestas/`;

export const obtenerEncuestas = () => axios.get(API_URL);
export const obtenerEncuesta = (id) => axios.get(`${API_URL}/${id}`);
export const crearEncuesta = (encuesta) => axios.post(API_URL, encuesta);
export const actualizarEncuesta = (id, encuesta) => axios.put(`${API_URL}/${id}`, encuesta);
export const eliminarEncuesta = (id) => axios.delete(`${API_URL}/${id}`);
export const obtenerEncuestasValidas = () => axios.get(`${API_URL}/validas`);
export const obtenerEncuestasPorfechaEspecifica = (fecha) => axios.get(`${API_URL}/fecha/${fecha}`);