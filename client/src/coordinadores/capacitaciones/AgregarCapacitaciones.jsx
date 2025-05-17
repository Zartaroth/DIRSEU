import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import {
  School as SchoolIcon,
  ErrorOutline as ErrorOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';

const FormularioCapacitacion = ({ capacitacion, onSubmit }) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    lugar: '',
    cupo_maximo: '',
    imagen: null, // Estado para la imagen
  });

  // Estados para manejar errores y mensajes de éxito
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Efecto para inicializar formData cuando cambia capacitacion
  useEffect(() => {
    if (capacitacion) {
      setFormData({
        nombre: capacitacion.nombre || '',
        descripcion: capacitacion.descripcion || '',
        fecha_inicio: capacitacion.fecha_inicio
          ? capacitacion.fecha_inicio.split('T')[0]
          : '',
        fecha_fin: capacitacion.fecha_fin
          ? capacitacion.fecha_fin.split('T')[0]
          : '',
        lugar: capacitacion.lugar || '',
        cupo_maximo: capacitacion.cupo_maximo || '',
        imagen: null, // Reiniciar la imagen al editar
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        lugar: '',
        cupo_maximo: '',
        imagen: null, // Reiniciar la imagen al crear
      });
    }
  }, [capacitacion]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar cambios en el campo de archivo (imagen)
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
      !formData.fecha_inicio ||
      !formData.fecha_fin ||
      !formData.lugar ||
      !formData.cupo_maximo
    ) {
      setError('Por favor, completa todos los campos obligatorios.');
      setSuccess(false);
      return;
    }

    if (
      isNaN(formData.cupo_maximo) ||
      parseInt(formData.cupo_maximo) <= 0
    ) {
      setError('El cupo máximo debe ser un número positivo.');
      setSuccess(false);
      return;
    }

    // Validación de fechas (opcional)
    const inicio = new Date(formData.fecha_inicio);
    const fin = new Date(formData.fecha_fin);
    if (inicio > fin) {
      setError('La fecha de inicio no puede ser posterior a la fecha de fin.');
      setSuccess(false);
      return;
    }

    // Si la validación pasa
    setError('');
    setSuccess(true);
    onSubmit(formData);

    // Resetear el formulario si es para crear una nueva capacitación
    if (!capacitacion) {
      setFormData({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        lugar: '',
        cupo_maximo: '',
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
        <SchoolIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h5" component="h2" color="text.primary">
          {capacitacion ? 'Actualizar Capacitación' : 'Agregar Capacitación'}
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
          ¡Éxito! La capacitación ha sido {capacitacion ? 'actualizada' : 'agregada'} correctamente.
        </Alert>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Campo de Nombre */}
          <TextField
            label="Nombre de la capacitación*"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ej: Capacitación en Liderazgo"
            fullWidth
          />

          {/* Campo de Descripción */}
          <TextField
            label="Descripción"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe los detalles de la capacitación"
            multiline
            rows={4}
            fullWidth
          />

          {/* Campo de Fecha de inicio */}
          <TextField
            label="Fecha de inicio*"
            id="fecha_inicio"
            name="fecha_inicio"
            type="date"
            value={formData.fecha_inicio}
            onChange={handleChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          {/* Campo de Fecha de fin */}
          <TextField
            label="Fecha de fin*"
            id="fecha_fin"
            name="fecha_fin"
            type="date"
            value={formData.fecha_fin}
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
            placeholder="Ej: Sala de Conferencias A"
            fullWidth
          />

          {/* Campo de Cupo máximo */}
          <TextField
            label="Cupo máximo*"
            id="cupo_maximo"
            name="cupo_maximo"
            type="number"
            value={formData.cupo_maximo}
            onChange={handleChange}
            required
            placeholder="Ej: 30"
            inputProps={{ min: 1 }}
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
          {formData.imagen && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Imagen seleccionada: {formData.imagen.name}
            </Typography>
          )}

          {/* Botón de enviar */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<SchoolIcon />}
            sx={{ mt: 2 }}
          >
            {capacitacion ? 'Actualizar Capacitación' : 'Agregar Capacitación'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormularioCapacitacion;
