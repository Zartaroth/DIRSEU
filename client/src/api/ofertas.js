import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/ofertas/';

const API_URL = `${import.meta.env.VITE_API_URL}/api/ofertas/`;

// Recuperar el token del localStorage
const token = localStorage.getItem('accessToken');

// Configuración de encabezados con el token
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
};

// Funciones para interactuar con la API usando axios
export const obtenerOfertas = () => {
    return axios.get(API_URL, { headers });
};

export const obtenerOferta = (id) => {
    return axios.get(`${API_URL}/${id}`, { headers });
};

export const crearOferta = (oferta) => {
    return axios.post(API_URL, oferta, { headers });
};

export const actualizarOferta = (id, oferta) => {
    return axios.put(`${API_URL}/${id}`, oferta, { headers });
};

export const eliminarOferta = (id) => {
    return axios.delete(`${API_URL}/${id}`, { headers });
};

export const obtenerOfertasEmpleador = () => {
    return axios.get(`${API_URL}/empleador/ofertas`, { headers });
};
