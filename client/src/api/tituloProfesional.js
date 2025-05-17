// const BASE_URL = "http://localhost:4000";

const BASE_URL = import.meta.env.VITE_API_URL;

// Crear un nuevo título profesional
export const createTituloProfesionalRequest = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/titulos`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al crear el título profesional:", error);
        throw error;
    }
};

// Obtener todos los títulos profesionales de un egresado
export const getTitulosByEgresadoRequest = async (idEgresado) => {
    try {
        const response = await fetch(`${BASE_URL}/api/titulos/egresado/${idEgresado}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener los títulos profesionales del egresado:", error);
        throw error;
    }
};

// Obtener todos los títulos profesionales
export const getAllTitulosRequest = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/titulos`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener todos los títulos profesionales:", error);
        throw error;
    }
};

// Obtener un título profesional específico por ID
export const getTituloByIdRequest = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/titulos/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener el título profesional:", error);
        throw error;
    }
};

// Actualizar un título profesional
export const updateTituloProfesionalRequest = async (id, data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/titulos/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al actualizar el título profesional:", error);
        throw error;
    }
};

// Eliminar un título profesional
export const deleteTituloProfesionalRequest = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/titulos/${data.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: data.id }), // Incluye el id en el cuerpo de la solicitud
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar título profesional: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al eliminar el título profesional:", error);
        throw error; // Relanza el error para que sea capturado en el frontend
    }
};
