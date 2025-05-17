import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ErrorOutline as ErrorOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
} from '@mui/icons-material';

const FormularioTaller = ({ taller, onSubmit }) => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    lugar: '',
    cupo_maximo: '',
    imagen: null, // Estado para la imagen
    codigo_instructor: '',
  });

  // Estados para manejar errores y mensajes de éxito
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Efecto para inicializar formData cuando cambia taller
  useEffect(() => {
    if (taller) {
      setFormData({
        nombre: taller.nombre || '',
        descripcion: taller.descripcion || '',
        fecha_inicio: taller.fecha_inicio
          ? taller.fecha_inicio.split('T')[0]
          : '',
        fecha_fin: taller.fecha_fin
          ? taller.fecha_fin.split('T')[0]
          : '',
        lugar: taller.lugar || '',
        cupo_maximo: taller.cupo_maximo || '',
        imagen: null,
        codigo_instructor: taller.codigo_instructor || '',
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        lugar: '',
        cupo_maximo: '',
        imagen: null,
        codigo_instructor: '',
      });
    }
  }, [taller]);

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
      !formData.fecha_inicio ||
      !formData.fecha_fin ||
      !formData.lugar ||
      !formData.cupo_maximo ||
      !formData.codigo_instructor
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

    // Resetear el formulario si es para crear un nuevo taller
    if (!taller) {
      setFormData({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        lugar: '',
        cupo_maximo: '',
        imagen: null,
        codigo_instructor: '',
      });
    }
  };

  const instructores = [
    { codigo: 'INSAV', nombre: 'Instructor de Artes Visuales' },
    { codigo: 'INSOS', nombre: 'Instructor de Orquesta Sinfónica' },
    { codigo: 'INSCoro', nombre: 'Instructor de Coro' },
    { codigo: 'INSDM', nombre: 'Instructor de Danza Moderna' },
    { codigo: 'INSDF', nombre: 'Instructor de Danza Folclórica' },
    { codigo: 'INSTeatro', nombre: 'Instructor de Teatro' },
    { codigo: 'INSTF', nombre: 'Instructor de Tuna Femenina' },
    { codigo: 'INSTU', nombre: 'Instructor de Tuna Universitaria' },
    { codigo: 'INSRC', nombre: 'Instructor de Ritmo y Conexión' },
  ];

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
          {taller
            ? 'Actualizar Taller'
            : 'Agregar Taller'}
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
          ¡Éxito! El taller ha sido{' '}
          {taller ? 'actualizado' : 'agregado'} correctamente.
        </Alert>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Campo de Nombre */}
          <TextField
            label="Nombre del taller*"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ej: Taller de fotografía"
            fullWidth
          />

          {/* Campo de Descripción */}
          <TextField
            label="Descripción"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe los detalles del taller"
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
            placeholder="Ej: Auditorio principal"
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

          <FormControl fullWidth required>
            <InputLabel id="codigo-instructor-label">Código de Instructor*</InputLabel>
            <Select
              labelId="codigo-instructor-label"
              id="codigo_instructor"
              name="codigo_instructor"
              value={formData.codigo_instructor}
              onChange={handleChange}
              label="Código de Instructor*"
            >
              {instructores.map((instructor) => (
                <MenuItem key={instructor.codigo} value={instructor.codigo}>
                  {instructor.codigo} - {instructor.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
            startIcon={<FavoriteIcon />}
            sx={{ mt: 2 }}
          >
            {taller
              ? 'Actualizar Taller'
              : 'Agregar Taller'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormularioTaller;
