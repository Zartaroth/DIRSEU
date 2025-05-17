import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from '@mui/material';

const ListaOfertas = ({ ofertas, onEditar, onEliminar }) => {
  if (ofertas.length === 0) {
    return <Typography>No tienes ofertas publicadas.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
      <Table sx={{ tableLayout: 'fixed', minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ maxWidth: 100 }}>Título</TableCell>
            <TableCell sx={{ maxWidth: 200 }}>Descripción</TableCell>
            <TableCell sx={{ maxWidth: 150 }}>Requisitos</TableCell>
            <TableCell sx={{ maxWidth: 150 }}>Habilidades</TableCell>
            <TableCell>Experiencia Mínima</TableCell>
            <TableCell>Carrera Destino</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ofertas.map((o) => (
            <TableRow key={o.id}>
              <TableCell sx={{ whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: 100 }}>
                {o.titulo}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: 200 }}>
                {o.descripcion}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: 150 }}>
                {o.requisitos}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: 150 }}>
                {o.habilidades}
              </TableCell>
              <TableCell>{o.experiencia_minima} años</TableCell>
              <TableCell sx={{ whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: 150 }}>
                {o.carrera_destino}
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => onEditar(o)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onEliminar(o.id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListaOfertas;
