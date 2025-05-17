import React, { useState, useEffect } from 'react';
import FormularioCapacitacion from './AgregarCapacitaciones';
import {
  obtenerCapacitaciones,
  crearCapacitacion,
  actualizarCapacitacion,
  eliminarCapacitacion
} from '../../api/capacitaciones';
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

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#007BFF',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const VerCapacitaciones = () => {
  const [capacitaciones, setCapacitaciones] = useState([]);
  const [capacitacion, setCapacitacion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const cargarCapacitaciones = async () => {
    try {
      const response = await obtenerCapacitaciones();
      setCapacitaciones(response.data);
    } catch (error) {
      setError('Error al obtener las capacitaciones');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarCapacitaciones();
  }, []);

  const handleOpenModal = (capacitacion = null) => {
    setCapacitacion(capacitacion);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCapacitacion(null);
    setOpenModal(false);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (data) => {
    try {
      let response;
      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('descripcion', data.descripcion);
      formData.append('fecha_inicio', data.fecha_inicio);
      formData.append('fecha_fin', data.fecha_fin);
      formData.append('lugar', data.lugar);
      formData.append('cupo_maximo', data.cupo_maximo);
      if (data.imagen) {
        formData.append('imagen', data.imagen);
      }

      console.log('Datos enviados:', Object.fromEntries(formData));

      if (capacitacion) {
        response = await actualizarCapacitacion(capacitacion.id, formData);
        alert('Capacitación actualizada exitosamente');
      } else {
        response = await crearCapacitacion(formData);
        alert('Capacitación creada exitosamente');
      }
      await cargarCapacitaciones();
      handleCloseModal();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Error al guardar la capacitación');
      }
    }
  };

  // Manejar la eliminación de una capacitación
  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta capacitación?')) {
      try {
        await eliminarCapacitacion(id);
        await cargarCapacitaciones();
      } catch (error) {
        setError('Error al eliminar la capacitación');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={6} bgcolor="background.default" color="text.primary" minHeight="100vh">
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Lista de Capacitaciones
        </Typography>

        {error && (
          <Typography color="error" gutterBottom align="center">
            {error}
          </Typography>
        )}

        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal()}
          >
            Agregar Capacitación
          </Button>
        </Box>

        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Fecha Inicio</TableCell>
                  <TableCell>Fecha Fin</TableCell>
                  <TableCell>Ubicación</TableCell>
                  <TableCell>Cupo Máximo</TableCell>
                  <TableCell>Imagen</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {capacitaciones.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.nombre}</TableCell>
                    <TableCell>{c.descripcion}</TableCell>
                    <TableCell>{new Date(c.fecha_inicio).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(c.fecha_fin).toLocaleDateString()}</TableCell>
                    <TableCell>{c.lugar}</TableCell>
                    <TableCell>{c.cupo_maximo}</TableCell>
                    <TableCell>
                      {c.imagen ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}${c.imagen}`}
                          alt={c.nombre}
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
                        onClick={() => handleOpenModal(c)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEliminar(c.id)}
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

        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle color="text.primary">
            {capacitacion ? 'Actualizar Capacitación' : 'Crear Capacitación'}
          </DialogTitle>
          <DialogContent>
            <FormularioCapacitacion
              capacitacion={capacitacion}
              onSubmit={handleSubmit}
            />
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

export default VerCapacitaciones;
