import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { 
  Event as EventIcon, 
  ErrorOutline as ErrorOutlineIcon, 
  CheckCircleOutline as CheckCircleOutlineIcon 
} from '@mui/icons-material';

const FormularioEventoCalendario = ({ calendario, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '', // Será autogenerado si es necesario
    titulo: '',
    descripcion: '',
    fecha: '',
    enlace: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (calendario) {
      setFormData({
        titulo: calendario.titulo || '',
        descripcion: calendario.descripcion || '',
        fecha: calendario.fecha ? calendario.fecha.split('T')[0] : '',
        enlace: calendario.enlace || '',
      });
    } else {
      setFormData({
        titulo: '',
        descripcion: '',
        fecha: '',
        enlace: '',
      });
    }
  }, [calendario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.titulo || !formData.fecha) {
      setError('Por favor, completa los campos obligatorios.');
      setSuccess(false);
      return;
    }

    setError('');
    setSuccess(true);
    onSubmit(formData);

    if (!calendario) {
      setFormData({
        titulo: '',
        descripcion: '',
        fecha: '',
        enlace: '',
      });
    }
  };

  return (
    <Box
      maxWidth="sm"
      mx="auto"
      mt={4}
      p={4}
      bgcolor="background.paper"
      boxShadow={3}
      borderRadius={2}
    >
      <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
        <EventIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h5" component="h2" color="text.primary">
          {calendario ? 'Actualizar Evento' : 'Agregar Evento'}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} icon={<ErrorOutlineIcon />}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} icon={<CheckCircleOutlineIcon />}>
          ¡Éxito! El calendario ha sido {calendario ? 'actualizado' : 'agregado'} correctamente.
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Título del evento*"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            placeholder="Ej: Día Mundial del Medio Ambiente"
            fullWidth
          />

          <TextField
            label="Descripción"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Detalles del evento"
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            label="Fecha*"
            id="fecha"
            name="fecha"
            type="date"
            value={formData.fecha}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <TextField
            label="Enlace"
            id="enlace"
            name="enlace"
            value={formData.enlace}
            onChange={handleChange}
            placeholder="Ej: https://example.com"
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<EventIcon />}
            sx={{ mt: 2 }}
          >
            {calendario ? 'Actualizar Evento' : 'Agregar Evento'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormularioEventoCalendario;
