import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { obtenerOfertasFiltradasPorCarrera, postularseOferta } from '../api/apis';

const BolsaLaboralPage = ({ carrera }) => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    async function fetchOfertas() {
      const response = await obtenerOfertasFiltradasPorCarrera(carrera);
      setOfertas(response.data);
    }
    fetchOfertas();
  }, [carrera]);

  const handlePostulacion = async (oferta_id) => {
    await postularseOferta(oferta_id);
    alert('Postulación realizada exitosamente');
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Bolsa Laboral</Typography>
      <Grid container spacing={3}>
        {ofertas.map(oferta => (
          <Grid item xs={12} sm={6} md={4} key={oferta.id}>
            <Paper elevation={3} p={2}>
              <Typography variant="h6">{oferta.titulo}</Typography>
              <Typography variant="body1">{oferta.descripcion}</Typography>
              <Button variant="contained" color="primary" fullWidth onClick={() => handlePostulacion(oferta.id)}>
                Postularme
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BolsaLaboralPage;
