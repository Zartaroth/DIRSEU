import React, { useEffect, useState } from 'react';
import {
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
} from '../../api/eventos';
import { useAuth } from '../../context/AuthProvider';
import FormularioEvento from './AgregarEventos';
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
  TablePagination
} from '@mui/material';
import { Event as EventIcon } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#007BFF' },
    secondary: { main: '#f50057' },
  },
});

const EventosPage = () => {
  const { getUser } = useAuth();
  const userData = getUser();
  const codigo_coordinador = userData?.codigo_coordinador;

  const [eventos, setEventos] = useState([]);
  const [evento, setEvento] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(6); // Elementos por página

  const cargarEventos = async () => {
    try {
      const response = await obtenerEventos();
      setEventos(response.data);
    } catch (error) {
      console.error('Error al obtener eventos:', error);
      setError('Error al obtener los eventos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarEventos();
  }, []);

  const handleOpenModal = (evento = null) => {
    setEvento(evento);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setEvento(null);
    setOpenModal(false);
  };

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('descripcion', data.descripcion);
      formData.append('fecha', data.fecha);
      formData.append('hora', data.hora);
      formData.append('lugar', data.lugar);
      formData.append('codigo_coordinador', codigo_coordinador);

      if (data.imagen) {
        formData.append('imagen', data.imagen);
      }

      if (evento) {
        await actualizarEvento(evento.id, formData);
        alert('Evento actualizado exitosamente');
      } else {
        await crearEvento(formData);
        alert('Evento creado exitosamente');
      }

      setOpenModal(false);
      setEvento(null);
      await cargarEventos();
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      setError('Error al guardar el evento');
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      try {
        await eliminarEvento(id);
        await cargarEventos();
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
        setError('Error al eliminar el evento');
      }
    }
  };

  // Eventos por página
  const eventosPorPagina = eventos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <Box p={6} bgcolor="background.default" color="text.primary" minHeight="100vh">
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Lista de Eventos
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
            startIcon={<EventIcon />}
          >
            Agregar Evento
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
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Hora</TableCell>
                  <TableCell>Lugar</TableCell>
                  <TableCell>Imagen</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventosPorPagina.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell>{e.nombre}</TableCell>
                    <TableCell>{e.descripcion}</TableCell>
                    <TableCell>{new Date(e.fecha).toLocaleDateString()}</TableCell>
                    <TableCell>{e.hora}</TableCell>
                    <TableCell>{e.lugar}</TableCell>
                    <TableCell>
                      {e.imagen ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}${e.imagen}`}
                          alt={e.nombre}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      ) : (
                        'Sin imagen'
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mr: 2 }}
                        onClick={() => handleOpenModal(e)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleEliminar(e.id)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={eventos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
            />
          </TableContainer>
        )}

        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle color="text.primary">
            {evento ? 'Actualizar Evento' : 'Crear Evento'}
          </DialogTitle>
          <DialogContent>
            <FormularioEvento evento={evento} onSubmit={handleSubmit} />
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

export default EventosPage;
