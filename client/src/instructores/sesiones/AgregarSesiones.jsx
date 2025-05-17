import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Grid,
    MenuItem,
    Box,
    Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';

const tiposSesion = [
    { value: 'evento', label: 'Evento' },
    { value: 'practica', label: 'Práctica' },
];

const FormularioSesion = ({ sesion, onSubmit }) => {
    const { tallerId } = useParams();
    const [datos, setDatos] = useState({
        id_taller: tallerId || '', // Inicializar con el valor recibido
        fecha: '',
        tipo: '',
        detalle: '',
    });

    // Actualizar el formulario si se proporciona una sesión para editar
    useEffect(() => {
        if (sesion) {
            setDatos({
                id_taller: sesion.id_taller || datos.id_taller,
                fecha: sesion.fecha || '',
                tipo: sesion.tipo || '',
                detalle: sesion.detalle || '',
            });
        }
    }, [sesion]);

    // Manejar cambios en los inputs del formulario
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatos((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Manejar el envío del formulario
    const manejarSubmit = (e) => {
        e.preventDefault();
        if (!datos.id_taller || !datos.fecha || !datos.tipo || !datos.detalle) {
            alert('Todos los campos son obligatorios.');
            return;
        }
        onSubmit(datos); // Enviar todos los datos, incluido id_taller
    };

    return (
        <Box component="form" onSubmit={manejarSubmit} noValidate>
            <Typography variant="h6" gutterBottom>
                {sesion ? 'Editar Sesión' : 'Crear Nueva Sesión'}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        name="fecha"
                        label="Fecha"
                        type="date"
                        value={datos.fecha}
                        onChange={manejarCambio}
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        select
                        name="tipo"
                        label="Tipo de Sesión"
                        value={datos.tipo}
                        onChange={manejarCambio}
                        required
                    >
                        {tiposSesion.map((opcion) => (
                            <MenuItem key={opcion.value} value={opcion.value}>
                                {opcion.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        name="detalle"
                        label="Detalle"
                        value={datos.detalle}
                        onChange={manejarCambio}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                                setDatos({
                                    id_taller: datos.id_taller,
                                    fecha: '',
                                    tipo: '',
                                    detalle: '',
                                })
                            }
                        >
                            Limpiar
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            {sesion ? 'Actualizar Sesión' : 'Crear Sesión'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormularioSesion;
