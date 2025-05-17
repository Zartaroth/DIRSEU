import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import { obtenerNotificaciones } from '../api/apis';

const Notificaciones = ({ egresado_id }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    async function fetchNotificaciones() {
      const response = await obtenerNotificaciones(egresado_id);
      setNotificaciones(response.data);
    }
    fetchNotificaciones();
  }, [egresado_id]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Notificaciones</Typography>
      <Paper elevation={3}>
        <List>
          {notificaciones.map((notificacion) => (
            <ListItem key={notificacion.id}>
              <ListItemText
                primary={notificacion.mensaje}
                secondary={new Date(notificacion.fecha).toLocaleDateString()}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Notificaciones;
