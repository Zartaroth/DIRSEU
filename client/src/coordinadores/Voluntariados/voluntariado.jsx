import React, { useEffect, useState } from 'react';
import {
  obtenerVoluntariados,
  crearVoluntariado,
  actualizarVoluntariado,
  eliminarVoluntariado
} from '../../api/voluntariados';
import FormularioVoluntariado from './AgregarVoluntariados';
import {
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  ThemeProvider,
  createTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

// Creación del tema personalizado de MUI
const theme = createTheme({
  palette: {
    mode: 'light', // Puedes cambiar a 'dark' para modo oscuro
    primary: {
      main: '#007BFF',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const VoluntariadoPage = () => {
  const [voluntariados, setVoluntariados] = useState([]);
  const [voluntariado, setVoluntariado] = useState(null); // Voluntariado a editar
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false); // Controla la apertura del modal

  // Función para cargar los voluntariados
  const cargarVoluntariados = async () => {
    try {
      const response = await obtenerVoluntariados();
      setVoluntariados(response.data);
    } catch (error) {
      setError('Error al obtener los voluntariados');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarVoluntariados();
  }, []);

  // Maneja la apertura del modal para crear o editar
  const handleOpenModal = (voluntariado = null) => {
    setVoluntariado(voluntariado);
    setOpenModal(true);
  };

  // Maneja el cierre del modal
  const handleCloseModal = () => {
    setVoluntariado(null);
    setOpenModal(false);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('descripcion', data.descripcion);
      formData.append('fecha_inicio', data.fecha_inicio);
      formData.append('fecha_fin', data.fecha_fin);
      formData.append('lugar', data.lugar);
      formData.append('cupo_maximo', data.cupo_maximo);
  
      // Asegúrate de que la imagen esté en el FormData si se selecciona una
      if (data.imagen) {
        formData.append('imagen', data.imagen); // El campo 'imagen' debe coincidir con el nombre en el backend
      }
  
      if (voluntariado) {
        // Actualizar un voluntariado existente
        await actualizarVoluntariado(voluntariado.id, formData);
        alert('Voluntariado actualizado exitosamente');
      } else {
        // Crear un nuevo voluntariado
        await crearVoluntariado(formData);
        alert('Voluntariado creado exitosamente');
      }
  
      setVoluntariado(null);
      setOpenModal(false);
      await cargarVoluntariados();
    } catch (error) {
      console.error('Error al guardar el voluntariado:', error);
      setError('Error al guardar el voluntariado');
    }
  };

  // Maneja la eliminación de un voluntariado
  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este voluntariado?')) {
      try {
        await eliminarVoluntariado(id);
        await cargarVoluntariados();
      } catch (error) {
        setError('Error al eliminar el voluntariado');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={6} bgcolor="background.default" color="text.primary" minHeight="100vh">
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Lista de Voluntariados
        </Typography>

        {error && (
          <Typography color="error" gutterBottom align="center">
            {error}
          </Typography>
        )}

        {/* Botón para abrir el modal de creación */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal()}
          >
            Agregar Voluntariado
          </Button>
        </Box>

        {/* Tabla de Voluntariados */}
        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Fecha Inicio</TableCell>
                  <TableCell>Fecha Fin</TableCell>
                  <TableCell>Lugar</TableCell>
                  <TableCell>Cupo Máximo</TableCell>
                  <TableCell>Imagen</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {voluntariados.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell>{v.nombre}</TableCell>
                    <TableCell>{v.descripcion}</TableCell>
                    <TableCell>{new Date(v.fecha_inicio).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(v.fecha_fin).toLocaleDateString()}</TableCell>
                    <TableCell>{v.lugar}</TableCell>
                    <TableCell>{v.cupo_maximo}</TableCell>
                    <TableCell>
                      {v.imagen ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}${v.imagen}`}
                          alt={v.nombre}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      ) : (
                        'No hay imagen'
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                        onClick={() => handleOpenModal(v)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEliminar(v.id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Modal para Crear/Editar Voluntariado */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle color="text.primary">
            {voluntariado ? 'Actualizar Voluntariado' : 'Crear Voluntariado'}
          </DialogTitle>
          <DialogContent>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <FormularioVoluntariado
                voluntariado={voluntariado}
                onSubmit={handleSubmit}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="secondary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default VoluntariadoPage;
