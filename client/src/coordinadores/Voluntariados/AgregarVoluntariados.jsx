import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert, IconButton } from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ErrorOutline as ErrorOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';

const FormularioVoluntariado = ({ voluntariado, onSubmit }) => {
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

  const [imagenActual, setImagenActual] = useState(null); // Estado para la imagen actual del voluntariado

  // Estados para manejar errores y mensajes de éxito
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Efecto para inicializar formData cuando cambia voluntariado
  useEffect(() => {
    if (voluntariado) {
      setFormData({
        nombre: voluntariado.nombre || '',
        descripcion: voluntariado.descripcion || '',
        fecha_inicio: voluntariado.fecha_inicio
          ? voluntariado.fecha_inicio.split('T')[0]
          : '',
        fecha_fin: voluntariado.fecha_fin
          ? voluntariado.fecha_fin.split('T')[0]
          : '',
        lugar: voluntariado.lugar || '',
        cupo_maximo: voluntariado.cupo_maximo || '',
        imagen: null, // Reiniciar la imagen al editar
      });

      // Si hay una imagen existente, almacena su URL
      if (voluntariado.imagen) {
        setImagenActual(`${import.meta.env.VITE_API_URL}${voluntariado.imagen}`);
      }
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
      setImagenActual(null); // Reiniciar la imagen actual al crear
    }
  }, [voluntariado]);

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

    // Ocultar la imagen actual cuando se selecciona una nueva
    setImagenActual(null);
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

    // Si la validación pasa
    setError('');
    setSuccess(true);
    onSubmit(formData);

    // Resetear el formulario si es para crear un nuevo voluntariado
    if (!voluntariado) {
      setFormData({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        lugar: '',
        cupo_maximo: '',
        imagen: null,
      });
      setImagenActual(null);
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
        <FavoriteIcon color="error" sx={{ mr: 1 }} />
        <Typography variant="h5" component="h2" color="text.primary">
          {voluntariado
            ? 'Actualizar Voluntariado'
            : 'Agregar Voluntariado'}
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
          ¡Éxito! El voluntariado ha sido{' '}
          {voluntariado ? 'actualizado' : 'agregado'} correctamente.
        </Alert>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Campo de Nombre */}
          <TextField
            label="Nombre del voluntariado*"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ej: Limpieza de playa"
            fullWidth
          />

          {/* Campo de Descripción */}
          <TextField
            label="Descripción"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe los detalles del voluntariado"
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
            placeholder="Ej: Playa Los Cocos"
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
            placeholder="Ej: 50"
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

          {/* Mostrar la imagen actual si existe */}
          {imagenActual && (
            <Box mt={2}>
              <Typography variant="body2">Imagen actual:</Typography>
              <img
                src={imagenActual}
                alt="Imagen actual del voluntariado"
                style={{ width: '150px', height: 'auto', marginTop: '10px' }}
              />
            </Box>
          )}

          {/* Mostrar la nueva imagen seleccionada si existe */}
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
            startIcon={<FavoriteIcon />}
            sx={{ mt: 2 }}
          >
            {voluntariado
              ? 'Actualizar Voluntariado'
              : 'Agregar Voluntariado'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormularioVoluntariado;
