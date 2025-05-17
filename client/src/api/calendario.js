import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/calendario/';

const API_URL = `${import.meta.env.VITE_API_URL}/api/calendario/`;

export const obtenerEventosCalendario = async () => {
  const response = await axios.get(API_URL);
  return response.data; // Solo retorna los datos del servidor
};

export const crearCalendario = (calendario) => axios.post(API_URL, calendario);
export const actualizarCalendario = (id, calendario) => axios.put(`${API_URL}/${id}`, calendario);
export const eliminarCalendario = (id) => axios.delete(`${API_URL}/${id}`);
