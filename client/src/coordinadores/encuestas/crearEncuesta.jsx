import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const FormularioEncuesta = ({ encuesta, onSubmit }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (encuesta) {
      setFormData({
        titulo: encuesta.titulo || '',
        descripcion: encuesta.descripcion || '',
        fecha_inicio: encuesta.fecha_inicio
          ? encuesta.fecha_inicio.split('T')[0]
          : '',
        fecha_fin: encuesta.fecha_fin
          ? encuesta.fecha_fin.split('T')[0]
          : '',
      });
    } else {
      setFormData({
        titulo: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
      });
    }
  }, [encuesta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.titulo) {
      setError('El título es obligatorio.');
      setSuccess(false);
      return;
    }

    if (formData.fecha_inicio && formData.fecha_fin) {
      if (new Date(formData.fecha_inicio) > new Date(formData.fecha_fin)) {
        setError('La fecha de inicio no puede ser posterior a la fecha de fin.');
        setSuccess(false);
        return;
      }
    }

    setError('');
    setSuccess(true);
    onSubmit(formData);

    if (!encuesta) {
      // Reiniciar formulario
      setFormData({
        titulo: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
      });
    }

    // Ocultar mensaje de éxito después de unos segundos
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Box p={4} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        {encuesta ? 'Actualizar Encuesta' : 'Agregar Encuesta'}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success">
          Encuesta {encuesta ? 'actualizada' : 'agregada'} con éxito.
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Título de la Encuesta"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Fecha de Inicio"
          name="fecha_inicio"
          type="date"
          value={formData.fecha_inicio}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Fecha de Fin"
          name="fecha_fin"
          type="date"
          value={formData.fecha_fin}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box mt={3} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" type="submit">
            {encuesta ? 'Actualizar' : 'Agregar'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default FormularioEncuesta;
