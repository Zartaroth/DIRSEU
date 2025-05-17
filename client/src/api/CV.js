// const BASE_URL = "http://localhost:4000"; // Cambia esto por la URL del backend si está en un servidor diferente

const BASE_URL = import.meta.env.VITE_API_URL;

// Crear una nueva formación académica
export const createFormacionAcademicaRequest = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/formaciones`, {
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
        console.error("Error al crear la formación académica:", error);
        throw error;
    }
};

// Obtener todas las formaciones académicas de un egresado
export const getFormacionesByEgresadoRequest = async (idEgresado) => {
    try {
        const response = await fetch(`${BASE_URL}/api/formaciones/egresado/${idEgresado}`, {
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
        console.error("Error al obtener las formaciones académicas del egresado:", error);
        throw error;
    }
};

// Obtener todas las formaciones académicas
export const getAllFormacionesRequest = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/formaciones`, {
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
        console.error("Error al obtener todas las formaciones académicas:", error);
        throw error;
    }
};

// Obtener una formación académica específica por ID
export const getFormacionByIdRequest = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/formaciones/${id}`, {
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
        console.error("Error al obtener la formación académica:", error);
        throw error;
    }
};

// Actualizar una formación académica
export const updateFormacionAcademicaRequest = async (id, data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/formaciones/${id}`, {
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
        console.error("Error al actualizar la formación académica:", error);
        throw error;
    }
};

// Eliminar una formación académica
export const deleteFormacionAcademicaRequest = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/formaciones/${data.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: data.id }), // Incluye el id en el cuerpo de la solicitud
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar formación académica: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error al eliminar la formación académica:", error);
        throw error; // Relanza el error para que sea capturado en el frontend
    }
};

////////////////// EXPERIENCIAS LABORALES ///////////////////////

// Obtener todas las experiencias laborales
export const getAllExperienciasRequest = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/experiencias`, {
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
        console.error("Error al obtener todas las experiencias laborales:", error);
        throw error;
    }
};

// Obtener las experiencias laborales de un egresado
export const getExperienciasByEgresadoRequest = async (idEgresado) => {
    try {
        const response = await fetch(`${BASE_URL}/api/experiencias/egresado/${idEgresado}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                return { message: "No hay experiencias laborales para este egresado." };
            }
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error al obtener las experiencias laborales del egresado:", error);
        throw error;
    }
};  

// Obtener una experiencia laboral específica por ID
export const getExperienciaByIdRequest = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/experiencias/${id}`, {
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
        console.error(`Error al obtener la experiencia laboral con ID ${id}:`, error);
        throw error;
    }
};

// Crear una nueva experiencia laboral
export const createExperienciaLaboralRequest = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/experiencias`, {
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
        console.error("Error al crear una nueva experiencia laboral:", error);
        throw error;
    }
};

// Actualizar una experiencia laboral
export const updateExperienciaLaboralRequest = async (id, updatedData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/experiencias/${id}`, {
        method: "PUT", // Usamos PUT para editar
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData), // Enviar solo los datos actualizados
      });
  
      if (!response.ok) {
        throw new Error(`Error al editar experiencia laboral: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error al editar el registro:", error);
      throw error; // Lanzar el error para que se capture en el frontend
    }
  };

// Eliminar una experiencia laboral
export const deleteExperienciaLaboralRequest = async (data) => {
    try {
      const response = await fetch(`${BASE_URL}/api/experiencias/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: data.id }),
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar experiencia laboral: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error al eliminar el registro:", error);
      throw error; // Vuelve a lanzar el error para que sea capturado en el frontend
    }
};

////////////////// HABILIDADES ///////////////////////

// Crear una nueva habilidad
export const createHabilidadRequest = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/habilidades`, {
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
        console.error("Error al crear una nueva habilidad:", error);
        throw error;
    }
};

// Obtener todas las habilidades de un egresado específico
export const getHabilidadesByEgresadoRequest = async (idEgresado) => {
    try {
        const response = await fetch(`${BASE_URL}/api/habilidades/egresado/${idEgresado}`, {
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
        console.error(`Error al obtener las habilidades del egresado con ID ${idEgresado}:`, error);
        throw error;
    }
};

// Obtener todas las habilidades
export const getAllHabilidadesRequest = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/habilidades`, {
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
        console.error("Error al obtener todas las habilidades:", error);
        throw error;
    }
};

// Obtener una habilidad específica por ID
export const getHabilidadByIdRequest = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/habilidades/${id}`, {
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
        console.error(`Error al obtener la habilidad con ID ${id}:`, error);
        throw error;
    }
};

// Actualizar una habilidad
export const updateHabilidadRequest = async (id, data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/habilidades/${id}`, {
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
        console.error(`Error al actualizar la habilidad con ID ${id}:`, error);
        throw error;
    }
};

// Eliminar una habilidad
export const deleteHabilidadRequest = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/habilidades/${data.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar la habilidad: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error al eliminar la habilidad con ID ${data.id}:`, error);
        throw error;
    }
};

////////////////// IDIOMAS ///////////////////////

// Crear un nuevo idioma
export const createIdiomaRequest = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/idiomas`, {
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
        console.error("Error al crear un nuevo idioma:", error);
        throw error;
    }
};

// Obtener todos los idiomas de un egresado
export const getIdiomasByEgresadoRequest = async (idEgresado) => {
    try {
        const response = await fetch(`${BASE_URL}/api/idiomas/egresado/${idEgresado}`, {
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
        console.error(`Error al obtener los idiomas del egresado con ID ${idEgresado}:`, error);
        throw error;
    }
};

// Obtener todos los idiomas
export const getAllIdiomasRequest = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/idiomas`, {
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
        console.error("Error al obtener todos los idiomas:", error);
        throw error;
    }
};

// Obtener un idioma específico por ID
export const getIdiomaByIdRequest = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/idiomas/${id}`, {
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
        console.error(`Error al obtener el idioma con ID ${id}:`, error);
        throw error;
    }
};

// Actualizar un idioma
export const updateIdiomaRequest = async (id, data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/idiomas/${id}`, {
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
        console.error(`Error al actualizar el idioma con ID ${id}:`, error);
        throw error;
    }
};

// Eliminar un idioma
export const deleteIdiomaRequest = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/idiomas/${data.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: data.id }), // Incluye el id en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar idioma: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error al eliminar el idioma con ID ${data.id}:`, error);
        throw error; // Relanza el error para manejo en el frontend
    }
};

////////////////// LOGROS ///////////////////////

// Crear un nuevo logro
export const createLogroRequest = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/logros`, {
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
        console.error("Error al crear un nuevo logro:", error);
        throw error;
    }
};

// Obtener todos los logros de un egresado
export const getLogrosByEgresadoRequest = async (idEgresado) => {
    try {
        const response = await fetch(`${BASE_URL}/api/logros/egresado/${idEgresado}`, {
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
        console.error(`Error al obtener los logros del egresado con ID ${idEgresado}:`, error);
        throw error;
    }
};

// Obtener todos los logros
export const getAllLogrosRequest = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/logros`, {
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
        console.error("Error al obtener todos los logros:", error);
        throw error;
    }
};

// Obtener un logro específico por ID
export const getLogroByIdRequest = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/api/logros/${id}`, {
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
        console.error(`Error al obtener el logro con ID ${id}:`, error);
        throw error;
    }
};

// Actualizar un logro
export const updateLogroRequest = async (id, data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/logros/${id}`, {
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
        console.error(`Error al actualizar el logro con ID ${id}:`, error);
        throw error;
    }
};

// Eliminar un logro
export const deleteLogroRequest = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/api/logros/${data.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: data.id }),
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar logro: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error al eliminar el logro con ID ${data.id}:`, error);
        throw error;
    }
};