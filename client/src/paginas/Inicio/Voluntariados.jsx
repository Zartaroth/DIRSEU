import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, CircularProgress } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

// Componente principal
const Programas = () => {
  const [voluntariados, setVoluntariados] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  useEffect(() => {
    // Aquí debes obtener los datos de la base de datos
    const fetchVoluntariados = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/voluntariados`); // Asegúrate de tener la ruta correcta
        const data = await response.json();
        setVoluntariados(data);
      } catch (error) {
        console.error('Error fetching voluntariados:', error);
      } finally {
        setLoading(false); // Cambiar el estado a false después de cargar los datos
      }
    };

    fetchVoluntariados();
  }, []);

  // Función para abrir y cerrar el modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Ver más
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          width: { xs: '90%', sm: 600 }, // 90% en pantallas pequeñas, 600px en pantallas medianas y grandes
          height: 'auto', // Ajuste automático según contenido
          margin: 'auto',
          mt: { xs: 5, md: 10 }, // Margen superior responsivo
          bgcolor: 'white',
          padding: 2,
          borderRadius: 2, // Esquinas redondeadas
          boxShadow: 24, // Sombra para dar profundidad
        }}>
          <Carousel>
            {loading ? ( // Mostrar un cargador mientras se cargan las imágenes
              <div style={{ textAlign: 'center', padding: 20 }}>
                <CircularProgress />
                <p>Cargando...</p>
              </div>
            ) : (
              voluntariados.map((voluntariado) => (
                <div key={voluntariado.id} style={{ textAlign: 'center' }}>
                  <h2>{voluntariado.nombre}</h2>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${voluntariado.imagen}`}
                    alt={voluntariado.nombre}
                    style={{ width: '100%', height: 'auto' }}
                    loading="lazy" // Carga diferida
                  />
                </div>
              ))
            )}
          </Carousel>
        </Box>
      </Modal>
    </div>
  );
};

export default Programas;
