import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import {
  Event as EventIcon,
  ErrorOutline as ErrorOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';

const FormularioEvento = ({ evento, onSubmit }) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha: '',
    hora: '',
    lugar: '',
    imagen: null,
  });

  // Estados para manejar errores y mensajes de éxito
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Efecto para inicializar formData cuando cambia evento
  useEffect(() => {
    if (evento) {
      setFormData({
        nombre: evento.nombre || '',
        descripcion: evento.descripcion || '',
        fecha: evento.fecha
          ? evento.fecha.split('T')[0]
          : '',
        hora: evento.hora || '',
        lugar: evento.lugar || '',
        imagen: null,
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        fecha: '',
        hora: '',
        lugar: '',
        imagen: null,
      });
    }
  }, [evento]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      imagen: file,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (
      !formData.nombre ||
      !formData.fecha ||
      !formData.hora ||
      !formData.lugar
    ) {
      setError('Por favor, completa todos los campos obligatorios.');
      setSuccess(false);
      return;
    }

    // Si la validación pasa
    setError('');
    setSuccess(true);
    onSubmit(formData);

    // Resetear el formulario si es para crear un nuevo evento
    if (!evento) {
      setFormData({
        nombre: '',
        descripcion: '',
        fecha: '',
        hora: '',
        lugar: '',
        imagen: null,
      });
    }
  };

  return (
    <Box
      maxWidth="md"
      mx="auto"
      mt={4}
      p={4}
      bgcolor="background.paper"
      boxShadow={3}
      borderRadius={2}
    >
      {/* Título del formulario con icono */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={3}
      >
        <EventIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h5" component="h2" color="text.primary">
          {evento ? 'Actualizar Evento' : 'Agregar Evento'}
        </Typography>
      </Box>

      {/* Mostrar mensaje de error si existe */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          icon={<ErrorOutlineIcon />}
        >
          {error}
        </Alert>
      )}

      {/* Mostrar mensaje de éxito si existe */}
      {success && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
          icon={<CheckCircleOutlineIcon />}
        >
          ¡Éxito! El evento ha sido {evento ? 'actualizado' : 'agregado'} correctamente.
        </Alert>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Campo de Nombre */}
          <TextField
            label="Nombre del evento*"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ej: Conferencia de React"
            fullWidth
          />

          {/* Campo de Descripción */}
          <TextField
            label="Descripción"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe los detalles del evento"
            multiline
            rows={4}
            fullWidth
          />

          {/* Campo de Fecha de inicio */}
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

          {/* Campo de Hora */}
          <TextField
            label="Hora*"
            id="hora"
            name="hora"
            type="time"
            value={formData.hora}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          {/* Campo de Lugar */}
          <TextField
            label="Lugar*"
            id="lugar"
            name="lugar"
            value={formData.lugar}
            onChange={handleChange}
            required
            placeholder="Ej: Auditorio Principal"
            fullWidth
          />

          {/* Campo para subir imagen */}
          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2 }}
          >
            Subir Imagen
            <input
              type="file"
              name="imagen"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>

          {/* Botón de enviar */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<EventIcon />}
            sx={{ mt: 2 }}
          >
            {evento ? 'Actualizar Evento' : 'Agregar Evento'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormularioEvento;
