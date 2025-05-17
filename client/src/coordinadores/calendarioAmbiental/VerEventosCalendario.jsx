import React, { useState, useEffect } from 'react';
import FormularioEventoCalendario from "./AgregarEventoCalendario";
import { obtenerEventosCalendario, crearCalendario, actualizarCalendario, eliminarCalendario } from '../../api/calendario.js';

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
      primary: { main: '#007BFF' },
      secondary: { main: '#f50057' },
    },
  });
  
  const VerCalendarioAmbiental = () => {
    const [calendarios, setCalendarios] = useState([]);
    const [calendario, setCalendario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
  
    const cargarCalendarios = async () => {
      try {
        const response = await obtenerEventosCalendario();
        if (Array.isArray(response)) {
          setCalendarios(response);
        } else {
          setCalendarios([]);
        }
      } catch (error) {
        setError('Error al obtener los eventos del calendario ambiental');
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      cargarCalendarios();
    }, []);
  
    const handleOpenModal = (calendario = null) => {
      setCalendario(calendario);
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setCalendario(null);
      setOpenModal(false);
    };
  
    const handleSubmit = async (data) => {
      try {
        let response;
        const formData = new FormData();
        formData.append('titulo', data.titulo);
        formData.append('descripcion', data.descripcion);
        formData.append('fecha', data.fecha);
        formData.append('enlace', data.enlace);

        if (calendario) {
          response = await actualizarCalendario(calendario.id, data);
          alert('Evento de calendario actualizado exitosamente');
        } else {
          response = await crearCalendario(data);
          alert('Evento de calendario ambiental creado exitosamente');
        }
        await cargarCalendarios();
        handleCloseModal();
      } catch (error) {
        console.error(error);
        setError('Error al guardar el evento de calendario ambiental');
      }
    };
  
    const handleEliminar = async (id) => {
      if (window.confirm('¿Estás seguro de que quieres eliminarlo?')) {
        try {
          await eliminarCalendario(id);
          await cargarCalendarios();
        } catch (error) {
          setError('Error al eliminar el evento del calendario ambiental');
        }
      }
    };
  
    return (
      <ThemeProvider theme={theme}>
        <Box p={6} bgcolor="background.default" color="text.primary" minHeight="100vh">
          <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
            Lista de Eventos del Calendario Ambiental
          </Typography>
  
          {error && (
            <Typography color="error" gutterBottom align="center">
              {error}
            </Typography>
          )}
  
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
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
                    <TableCell>Título</TableCell>
                    <TableCell>Descripción</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Enlace</TableCell>
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {calendarios.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{c.titulo}</TableCell>
                      <TableCell>{c.descripcion}</TableCell>
                      <TableCell>{new Date(c.fecha).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <a href={c.enlace} target="_blank" rel="noopener noreferrer">
                          Ver enlace
                        </a>
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
                        <Button variant="contained" color="secondary" onClick={() => handleEliminar(c.id)}>
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
              {calendario ? 'Actualizar Calendario' : 'Crear Evento de Calendario'}
            </DialogTitle>
            <DialogContent>
              <FormularioEventoCalendario calendario={calendario} onSubmit={handleSubmit} />
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
  
  export default VerCalendarioAmbiental;