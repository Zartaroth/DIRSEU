// const BASE_URL = "http://localhost:4000"; // Cambia esto por la URL del backend si está en un servidor diferente

const BASE_URL = import.meta.env.VITE_API_URL;

// Crear un nuevo bachillerato
export const createBachilleratoRequest = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/bachillerato`, {
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
        console.error("Error al crear el bachillerato:", error);
        throw error;
    }
};

// Obtener todos los bachilleratos de un egresado
export const getBachilleratosByEgresadoRequest = async (idEgresado) => {
    try {
        const response = await fetch(`${BASE_URL}/api/bachillerato/egresado/${idEgresado}`, {
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
        console.error("Error al obtener los bachilleratos del egresado:", error);
        throw error;
    }
};

// Obtener todos los bachilleratos
export const getAllBachilleratosRequest = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/bachillerato`, {
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
        console.error("Error al obtener todos los bachilleratos:", error);
        throw error;
    }
};

// Obtener un bachillerato específico por ID
export const getBachilleratoByIdRequest = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/bachillerato/${id}`, {
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
        console.error("Error al obtener el bachillerato:", error);
        throw error;
    }
};

// Actualizar un bachillerato
export const updateBachilleratoRequest = async (id, data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/bachillerato/${id}`, {
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
        console.error("Error al actualizar el bachillerato:", error);
        throw error;
    }
};

// Eliminar un bachillerato
export const deleteBachilleratoRequest = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/bachillerato/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el bachillerato: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al eliminar el bachillerato:", error);
        throw error;
    }
};