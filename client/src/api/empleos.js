import axios from 'axios';

// const API_URL = 'http://localhost:4000/api/empleos';

const API_URL = `${import.meta.env.VITE_API_URL}/api/empleos/`;

// Obtener todas las ofertas laborales
export const obtenerOfertasLaborales = () => axios.get(`${API_URL}`);

// Obtener una oferta laboral específica por id
export const obtenerOfertaLaboral = (id) => axios.get(`${API_URL}/${id}`);

// Crear una nueva oferta laboral
export const crearOfertaLaboral = (oferta) => axios.post(API_URL, oferta, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Actualizar una oferta laboral existente
export const actualizarOfertaLaboral = (id, oferta) => axios.put(`${API_URL}/${id}`, oferta, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

// Eliminar una oferta laboral por id
export const eliminarOfertaLaboral = (id) => axios.delete(`${API_URL}/${id}`);

// Obtener ofertas laborales válidas (no expiradas)
export const obtenerOfertasLaboralesValidas = () => axios.get(`${API_URL}/validas`);

// Obtener ofertas laborales filtradas por carrera profesional
export const obtenerOfertasPorCarrera = (carreraDestino) => axios.get(`${API_URL}/carrera/${carreraDestino}`);

// Obtener ofertas laborales hasta una fecha específica
export const obtenerOfertasPorFechaEspecifica = (fecha) => axios.get(`${API_URL}/fecha/${fecha}`);

// Obtener ofertas laborales filtradas por id_usuario (ofertas creadas por un usuario específico)
export const obtenerOfertasPorUsuario = (id_usuario) => axios.get(`${API_URL}/usuario/${id_usuario}`);
