// const BASE_URL = "http://localhost:4000";

const BASE_URL = import.meta.env.VITE_API_URL;

// Crear un nuevo empleo actual
export const createEmpleoActualRequest = async (data) => {
    console.log("Datos enviados al backend:", data); // 👀 Verifica qué se está enviando
    
    try {
        const response = await fetch(`${BASE_URL}/api/trabajos`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorResponse = await response.json(); // Capturar mensaje del backend
            throw new Error(`Error ${response.status}: ${errorResponse.error || response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al crear el empleo actual:", error);
        throw error;
    }
};

// Obtener el empleo actual de un egresado
export const getEmpleoByEgresadoRequest = async (idEgresado) => {
    try {
        const response = await fetch(`${BASE_URL}/api/trabajos/egresado/${idEgresado}`, {
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
        console.error("Error al obtener el empleo actual del egresado:", error);
        throw error;
    }
};

// Obtener todos los empleos actuales
export const getAllEmpleosRequest = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/trabajos`, {
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
        console.error("Error al obtener todos los empleos actuales:", error);
        throw error;
    }
};

// Obtener un empleo actual específico por ID
export const getEmpleoByIdRequest = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/trabajos/${id}`, {
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
        console.error("Error al obtener el empleo actual:", error);
        throw error;
    }
};

export const updateEmpleoActualRequest = async (id, data) => {
    console.log("➡️ Enviando PUT a:", `${BASE_URL}/api/trabajos/${id}`);
    console.log("📤 Datos enviados:", JSON.stringify(data, null, 2));

    try {
        const response = await fetch(`${BASE_URL}/api/trabajos/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        console.log("📥 Respuesta recibida:", response);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error al actualizar el empleo actual:", error);
        throw error;
    }
};

// Eliminar un empleo actual
export const deleteEmpleoActualRequest = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/trabajos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el empleo actual: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al eliminar el empleo actual:", error);
        throw error;
    }
};