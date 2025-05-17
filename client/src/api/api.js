// const BASE_URL = import.meta.env.VITE_SERVER;
// const BASE_URL = "http://localhost:4000";

const BASE_URL = import.meta.env.VITE_API_URL;

export const createUserRequest = async (data) =>
    await fetch(`${BASE_URL}/api/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const createStudentRequest = async (data) =>
    await fetch(`${BASE_URL}/api/signup/student`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const createEgresadoRequest = async (data) =>
    await fetch(`${BASE_URL}/api/signup/egresado`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const createDocenteRequest = async (data) =>
    await fetch(`${BASE_URL}/api/signup/docente`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const createEmpleadorRequest = async (data) =>
    await fetch(`${BASE_URL}/api/signup/empleador`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const accesUserRequest = async (data) =>
    await fetch(`${BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

export const refreshTokenRequest = async (refreshToken) => {
    return await fetch(`${BASE_URL}/api/refresh-token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
        },
    });
};

export const accessTokenRequest = async (accessToken) => {
    return await fetch(`${BASE_URL}/api/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

export const signOutRequest = async (refreshToken) => {
    return await fetch(`${BASE_URL}/api/signout`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
        },
    });
};


// API's TO USERS
export const getUserInfoRequest = async (accessToken) => {
    return await fetch(`${BASE_URL}/api/user/info`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

// API para cambio de contraseña
export const changePasswordRequest = async (accessToken, userId, currentPassword, newPassword) => {
    try {
        const response = await fetch(`${BASE_URL}/api/user/change-password`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                userId,         // Incluir userId
                currentPassword,
                newPassword,
            }),
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error al cambiar la contraseña");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en changePasswordRequest:", error);
        throw error;
    }
};

// API´s TO TABLES
export const getTableRequest = async (table) => {
    return await fetch(`${BASE_URL}/api/table/get-table`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(table)
    });
};

export const getTableByIdRequest = async (data) => {
    return await fetch(`${BASE_URL}/api/table/get-module`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
};

export const getUsersInscriptionRequest = async (data) => {
    return await fetch(`${BASE_URL}/api/table/users-inscription`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data) // Aquí se pasa un objeto con las propiedades table e id
    });
};

export const getEgresadosInscriptionRequest = async (data) => {
    return await fetch(`${BASE_URL}/api/table/egresados-inscription`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data) // Aquí se pasa un objeto con las propiedades table e id
    });
};

export const registerInscriptionRequest = async (data) => {
    return await fetch(`${BASE_URL}/api/table/register-inscription`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
};

export const registerInscriptionEgresados = async (data) => {
    return await fetch(`${BASE_URL}/api/table/register-inscripcionEgresados`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
};

// Postulaciones
export const registerPostulacionEgresados = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/api/postulaciones/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      // Manejar respuestas no exitosas
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage;
  
        if (contentType && contentType.includes("application/json")) {
          const errorJson = await response.json();
          errorMessage = errorJson.message || "Ocurrió un error.";
        } else {
          errorMessage = await response.text();
        }
  
        throw new Error(`Error en la solicitud: ${response.status} - ${errorMessage}`);
      }
  
      // Retornar los datos procesados en JSON
      return await response.json();
    } catch (error) {
      console.error("Error al registrar la postulación:", error);
      throw error; // Propagar el error al llamador
    }
};

// Crear nueva opción de pregunta
export const createOptionRequest = async (data) => {
    return await fetch(`${BASE_URL}/api/opciones_pregunta`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

// Para Mostrar los Nombres y Apellidos de los alumnos inscritos en cada taller
export const getTallerUsersRequest = async (tallerId) => {
    try {
        const response = await fetch(`${BASE_URL}/api/table/talleres/${tallerId}/inscritos`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Verificar si la respuesta es ok (200-299)
        if (!response.ok) {
            // Si la respuesta no es ok, leer el cuerpo de la respuesta como texto (HTML en caso de error)
            const errorText = await response.text();
            console.error('Error en la solicitud:', errorText);
            throw new Error('Error al obtener los usuarios inscritos');
        }

        // Intentar convertir la respuesta en JSON
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};