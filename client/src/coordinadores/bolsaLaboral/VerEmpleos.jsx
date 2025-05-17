import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthProvider';
import {
  obtenerOfertasLaborales,
  crearOfertaLaboral,
  actualizarOfertaLaboral,
  eliminarOfertaLaboral
} from '../../api/empleos';
import FormularioOferta from './AgregarEmpleos';
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
  IconButton,
  TablePagination
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#006fe6',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const OfertaLaboralPage = () => {
  const { getUser } = useAuth();
  const usuarioAutenticado = getUser();

  const [ofertas, setOfertas] = useState([]);
  const [oferta, setOferta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  
  // Estados de paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const cargarOfertasLaborales = async () => {
    try {
      const response = await obtenerOfertasLaborales();
      setOfertas(response.data);
    } catch (error) {
      setError('Error al obtener las ofertas laborales');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarOfertasLaborales();
  }, []);

  const handleOpenModal = (oferta = null) => {
    setOferta(oferta);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOferta(null);
    setOpenModal(false);
  };

  const handleSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('descripcion', data.descripcion);
      formData.append('requisitos', data.requisitos);
      formData.append('carrera_destino', data.carrera_destino);
      formData.append('empresa', data.empresa);
      formData.append('nro_contacto', data.nro_contacto);
      formData.append('correo_contacto', data.correo_contacto);
      formData.append('fecha_inicio', data.fecha_inicio);
      formData.append('fecha_fin', data.fecha_fin);
      if (data.imagen) {
        formData.append('imagen', data.imagen);
      }
      formData.append('id_usuario', usuarioAutenticado?.user_id);

      if (oferta) {
        await actualizarOfertaLaboral(oferta.id, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Oferta laboral actualizada exitosamente');
      } else {
        await crearOfertaLaboral(formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Oferta laboral creada exitosamente');
      }

      handleCloseModal();
      cargarOfertasLaborales();
    } catch (error) {
      setError('Error al guardar la oferta laboral');
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta oferta laboral?')) {
      try {
        await eliminarOfertaLaboral(id);
        await cargarOfertasLaborales();
      } catch (error) {
        setError('Error al eliminar la oferta laboral');
      }
    }
  };

  // Manejadores de cambio de página y número de filas por página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Ofertas actuales para mostrar según la página
  const ofertasPaginas = ofertas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <Box p={6} bgcolor="background.default" color="text.primary" minHeight="100vh">
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Lista de Ofertas Laborales
        </Typography>

        {error && (
          <Typography color="error" gutterBottom align="center">
            {error}
          </Typography>
        )}

        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
            Agregar Oferta Laboral
          </Button>
        </Box>

        {/* Tabla de Ofertas Laborales */}
        {isLoading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ width: '110%', maxWidth: '1200px', margin: 'auto', overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Requisitos</TableCell>
                  <TableCell>Empresa</TableCell>
                  <TableCell>Carrera Destino</TableCell>
                  <TableCell>Número de Contacto</TableCell>
                  <TableCell>Correo de Contacto</TableCell>
                  <TableCell>Fecha Inicio</TableCell>
                  <TableCell>Fecha Fin</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ofertasPaginas.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell>{o.nombre}</TableCell>
                    <TableCell>{o.descripcion}</TableCell>
                    <TableCell>{o.requisitos}</TableCell>
                    <TableCell>{o.empresa}</TableCell>
                    <TableCell>{o.carrera_destino}</TableCell>
                    <TableCell>{o.nro_contacto}</TableCell>
                    <TableCell>{o.correo_contacto}</TableCell>
                    <TableCell>{new Date(o.fecha_inicio).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(o.fecha_fin).toLocaleDateString()}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleOpenModal(o)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleEliminar(o.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Componente de paginación */}
            <TablePagination
              component="div"
              count={ofertas.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableContainer>
        )}

        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle color="text.primary">
            {oferta ? 'Actualizar Oferta Laboral' : 'Crear Oferta Laboral'}
          </DialogTitle>
          <DialogContent>
            {isLoading ? <CircularProgress /> : <FormularioOferta oferta={oferta} onSubmit={handleSubmit} />}
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

export default OfertaLaboralPage;
