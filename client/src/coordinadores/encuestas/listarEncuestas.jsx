import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import FormularioEncuesta from './crearEncuesta';
import {
  obtenerEncuestas,
  crearEncuesta,
  actualizarEncuesta,
  eliminarEncuesta,
} from '../../api/encuestas';
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
  DialogActions,
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

const VerEncuestas = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [encuestaSeleccionada, setEncuestaSeleccionada] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const cargarEncuestas = async () => {
    setIsLoading(true);
    try {
      const response = await obtenerEncuestas();
      setEncuestas(response.data);
      setError('');
    } catch {
      setError('Error al cargar las encuestas. Intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarEncuestas();
  }, []);

  const abrirModal = (encuesta = null) => {
    setEncuestaSeleccionada(encuesta);
    setOpenModal(true);
  };

  const cerrarModal = () => {
    setEncuestaSeleccionada(null);
    setOpenModal(false);
  };

  const manejarSubmit = async (datos) => {
    try {
      if (encuestaSeleccionada) {
        await actualizarEncuesta(encuestaSeleccionada.id, datos);
        alert('Encuesta actualizada exitosamente.');
      } else {
        await crearEncuesta(datos);
        alert('Encuesta creada exitosamente.');
      }
      await cargarEncuestas();
      cerrarModal();
    } catch {
      setError('Error al guardar la encuesta. Intente nuevamente.');
    }
  };

  const manejarEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta encuesta?')) {
      try {
        await eliminarEncuesta(id);
        await cargarEncuestas();
      } catch {
        setError('Error al eliminar la encuesta.');
      }
    }
  };

  const manejarPreguntas = (idEncuesta) => {
    navigate(`/Home/coordinadores/SeguimientoEgresado/encuesta/${idEncuesta}`);
  };

  const manejarReporte = (idEncuesta) => {
    navigate(`/Home/coordinadores/SeguimientoEgresado/reporte/${idEncuesta}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={6} minHeight="100vh">
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Lista de Encuestas
        </Typography>

        {error && (
          <Typography color="error" gutterBottom align="center">
            {error}
          </Typography>
        )}

        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" color="primary" onClick={() => abrirModal()}>
            Agregar Encuesta
          </Button>
        </Box>

        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Preguntas</TableCell>
                  <TableCell>Reportes</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {encuestas.map((encuesta) => (
                  <TableRow key={encuesta.id}>
                    <TableCell>{encuesta.titulo}</TableCell>
                    <TableCell>{encuesta.descripcion}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => manejarPreguntas(encuesta.id)}>
                        Ver Preguntas
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => manejarReporte(encuesta.id)}>
                        Ver Reporte
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" onClick={() => abrirModal(encuesta)}>
                        Editar
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => manejarEliminar(encuesta.id)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog open={openModal} onClose={cerrarModal} maxWidth="md" fullWidth>
          <DialogTitle>{encuestaSeleccionada ? 'Actualizar Encuesta' : 'Crear Encuesta'}</DialogTitle>
          <DialogContent>
            <FormularioEncuesta encuesta={encuestaSeleccionada} onSubmit={manejarSubmit} />
          </DialogContent>
          <DialogActions>
            <Button onClick={cerrarModal} color="secondary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default VerEncuestas;
