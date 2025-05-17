import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import {
  getPreguntasByEncuestaId,
  createPregunta,
  updatePregunta,
  deletePregunta,
} from '../../api/preguntas';
import { createOpcion, getOpcionesByPreguntaId, deleteOpcion } from '../../api/opcionesPreguntas';
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
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

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

const PreguntasPorEncuesta = () => {
  const { encuestaId } = useParams();
  const navigate = useNavigate();
  const [preguntas, setPreguntas] = useState([]);
  const [pregunta, setPregunta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openPreguntaModal, setOpenPreguntaModal] = useState(false);
  const [openOpcionesModal, setOpenOpcionesModal] = useState(false);
  const [newTexto, setNewTexto] = useState('');
  const [newTipo, setNewTipo] = useState('');
  const [opciones, setOpciones] = useState([]);
  const [selectedPreguntaId, setSelectedPreguntaId] = useState(null);

  const cargarPreguntas = async () => {
    setIsLoading(true);
    try {
      const response = await getPreguntasByEncuestaId(encuestaId);
      setPreguntas(response || []);
    } catch (error) {
      setError('Error al obtener las preguntas');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarPreguntas();
  }, [encuestaId]);

  const handleOpenPreguntaModal = (pregunta = null) => {
    setPregunta(pregunta);
    setNewTexto(pregunta ? pregunta.texto : '');
    setNewTipo(pregunta ? pregunta.tipo : '');
    setOpenPreguntaModal(true);
  };

  const handleClosePreguntaModal = () => {
    setPregunta(null);
    setNewTexto('');
    setNewTipo('');
    setOpenPreguntaModal(false);
  };

  const handleSubmitPregunta = async () => {
    try {
      const preguntaData = {
        texto: newTexto,
        tipo: newTipo,
        encuesta_id: encuestaId,
      };

      if (pregunta) {
        await updatePregunta(pregunta.id, preguntaData);
        alert('Pregunta actualizada exitosamente');
      } else {
        await createPregunta(preguntaData);
        alert('Pregunta creada exitosamente');
      }
      await cargarPreguntas();
      handleClosePreguntaModal();
    } catch (error) {
      setError('Error al guardar la pregunta');
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta pregunta?')) {
      try {
        await deletePregunta(id);
        await cargarPreguntas();
      } catch (error) {
        setError('Error al eliminar la pregunta');
      }
    }
  };

  const handleOpenOpcionesModal = async (preguntaId) => {
    setSelectedPreguntaId(preguntaId);
    try {
      const opcionesExistentes = await getOpcionesByPreguntaId(preguntaId);
      setOpciones(opcionesExistentes || []);
    } catch (error) {
      setError('Error al cargar las opciones');
    }
    setOpenOpcionesModal(true);
  };

  const handleCloseOpcionesModal = () => {
    setSelectedPreguntaId(null);
    setOpciones([]);
    setOpenOpcionesModal(false);
  };

  const handleAddOpcion = () => {
    setOpciones([...opciones, { id: null, texto: '' }]);
  };

  const handleChangeOpcion = (index, value) => {
    const updatedOpciones = [...opciones];
    updatedOpciones[index].texto = value;
    setOpciones(updatedOpciones);
  };

  const handleDeleteOpcion = async (opcionId, index) => {
    if (opcionId) {
      try {
        await deleteOpcion(opcionId);
        alert('Opción eliminada');
      } catch (error) {
        setError('Error al eliminar la opción');
      }
    }
    setOpciones(opciones.filter((_, i) => i !== index));
  };

  const handleSubmitOpciones = async () => {
    try {
      for (const opcion of opciones) {
        if (!opcion.id) {
          await createOpcion({
            texto: opcion.texto,
            pregunta_id: selectedPreguntaId,
          });
        }
      }
      alert('Opciones guardadas exitosamente');
      handleCloseOpcionesModal();
      await cargarPreguntas();
    } catch (error) {
      setError('Error al guardar las opciones');
    }
  };

  const handleTipoChange = (e) => {
    setNewTipo(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box p={6} minHeight="100vh">
        {/* Botón de regresar */}
        <Box mb={2}>
          <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
            Regresar
          </Button>
        </Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
          Preguntas de la Encuesta
        </Typography>

        {error && (
          <Typography color="error" gutterBottom align="center">
            {error}
          </Typography>
        )}

        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button variant="contained" color="primary" onClick={() => handleOpenPreguntaModal()}>
            Agregar Pregunta
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
                  <TableCell>Texto</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Alternativas</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Eliminar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {preguntas.length > 0 ? (
                  preguntas.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.texto}</TableCell>
                      <TableCell>{p.tipo}</TableCell>
                      <TableCell>
                        {p.tipo === 'opcion_multiple' || p.tipo === 'casillas' ? (
                          <Button variant="outlined" color="primary" onClick={() => handleOpenOpcionesModal(p.id)}>
                            Agregar Alternativa
                          </Button>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={() => handleOpenPreguntaModal(p)}>
                          Editar
                        </Button>
                      </TableCell>
                      <TableCell>
                      <Button variant="contained" color="secondary" onClick={() => handleEliminar(p.id)}>
                          Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No hay preguntas disponibles
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Modal para crear/editar pregunta */}
        <Dialog open={openPreguntaModal} onClose={handleClosePreguntaModal} maxWidth="md" fullWidth>
          <DialogTitle>{pregunta ? 'Actualizar Pregunta' : 'Crear Pregunta'}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="normal"
              label="Texto de la Pregunta"
              value={newTexto}
              onChange={(e) => setNewTexto(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Tipo de Pregunta</InputLabel>
              <Select value={newTipo} onChange={handleTipoChange} label="Tipo de Pregunta">
                <MenuItem value="texto">Texto</MenuItem>
                <MenuItem value="opcion_multiple">Opción Múltiple</MenuItem>
                <MenuItem value="casillas">Casillas</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePreguntaModal} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSubmitPregunta} color="primary">
              {pregunta ? 'Guardar Cambios' : 'Agregar Pregunta'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modal para agregar opciones */}
        <Dialog open={openOpcionesModal} onClose={handleCloseOpcionesModal} maxWidth="sm" fullWidth>
          <DialogTitle>Agregar Alternativas</DialogTitle>
          <DialogContent>
            {opciones.map((opcion, index) => (
              <Box display="flex" alignItems="center" mb={2} key={index}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={`Opción ${index + 1}`}
                  value={opcion.texto}
                  onChange={(e) => handleChangeOpcion(index, e.target.value)}
                />
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteOpcion(opcion.id, index)}
                  aria-label="Eliminar opción"
                >
                  <Close />
                </IconButton>
              </Box>
            ))}
            <Button variant="outlined" onClick={handleAddOpcion} color="primary">
              Agregar otra opción
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseOpcionesModal} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleSubmitOpciones} color="primary">
              Guardar Opciones
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default PreguntasPorEncuesta;
