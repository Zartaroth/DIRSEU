import React, { useState, useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import FormularioSesion from './AgregarSesiones';
import {
    getSesionesByTallerId,
    createSesion,
    updateSesion,
    deleteSesion,
} from '../../api/sesiones';
import { getTallerUsersRequest } from '../../api/api';
import { 
    createAsistencia,
    getAsistenciasDetalladas,
    updateAsistenciaEstado, 
    deleteAsistencia } from '../../api/asistencia';
import {
    Button,
    Box,
    Typography,
    Paper,
    CircularProgress,
    ThemeProvider,
    createTheme,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#007BFF',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

const VerSesiones = () => {
    const { tallerId } = useParams(); // Obtiene el ID del taller desde la URL
    const [sesiones, setSesiones] = useState([]);
    const [sesionSeleccionada, setSesionSeleccionada] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [openModalSesion, setOpenModalSesion] = useState(false);
    const [openModalAsistencia, setOpenModalAsistencia] = useState(false);
    const [sesionActual, setSesionActual] = useState(null); // Sesión actual para asistencia
    const [estudiantes, setEstudiantes] = useState([]); // Lista de estudiantes inscritos

    const navigate = useNavigate();

    // Cargar las sesiones asociadas al taller
    const cargarSesiones = async () => {
        setIsLoading(true);
        try {
            const response = await getSesionesByTallerId(tallerId);
            setSesiones(response || []);
        } catch (error) {
            setError('Error al obtener las sesiones del taller');
        } finally {
            setIsLoading(false);
        }
    };

    // Cargar estudiantes inscritos
    const cargarEstudiantes = async () => {
        try {
            const response = await getTallerUsersRequest(tallerId);
            if (response && response.success && Array.isArray(response.data)) {
                setEstudiantes(response.data);
            } else {
                setEstudiantes([]);
            }
        } catch (error) {
            setEstudiantes([]);
        }
    };

    useEffect(() => {
        cargarSesiones();
        cargarEstudiantes();
    }, [tallerId]);

    // Abrir el modal con la sesión seleccionada o vacío para crear nueva sesión
    const abrirModalSesion = (sesion = null) => {
        setSesionSeleccionada(sesion);
        setOpenModalSesion(true);
    };

    // Cerrar el modal de sesión
    const cerrarModalSesion = () => {
        setSesionSeleccionada(null);
        setOpenModalSesion(false);
    };

    // Abrir el modal de asistencia
    const manejarAsistencia = async (sesion) => {
        try {
            await cargarEstudiantes(); // Asegurarse de tener estudiantes cargados
            setSesionActual(sesion); // Guardar la sesión actual
            setOpenModalAsistencia(true); // Abrir el modal
        } catch (error) {
            console.error('Error al cargar los estudiantes inscritos:', error);
        }
    };

    // Cerrar el modal de asistencia
    const cerrarModalAsistencia = () => {
        setSesionActual(null);
        setOpenModalAsistencia(false);
    };

    // Manejar el formulario de crear o editar sesión
    const manejarSubmit = async (datos) => {
        try {
            if (sesionSeleccionada && sesionSeleccionada.id_sesion) {
                await updateSesion(sesionSeleccionada.id_sesion, datos);
                alert('Sesión actualizada exitosamente.');
            } else {
                await createSesion({ ...datos, tallerId });
                alert('Sesión creada exitosamente.');
            }
            await cargarSesiones();
            cerrarModalSesion();
        } catch (error) {
            setError('Error al guardar la sesión. Intente nuevamente.');
        }
    };

    const manejarEliminar = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar la sesión seleccionada?')) {
            try {
                await deleteSesion(id);
                await cargarSesiones();
            } catch (error) {
                setError('Error al eliminar la sesión seleccionada.');
            }
        }
    };

    const guardarAsistencia = async () => {
        try {
            if (!sesionActual || !estudiantes.length) {
                alert('No hay sesión activa o estudiantes inscritos.');
                return;
            }
    
            // Recorre cada estudiante para registrar su asistencia
            for (const estudiante of estudiantes) {
                const estado = document.getElementById(`asistencia-${estudiante.estudiante_id}`).value; // Obtener el valor del select
                
                // Log para verificar datos que se enviarán
                console.log('Datos a enviar para asistencia:', {
                    id_taller: tallerId,
                    id_estudiante: estudiante.estudiante_id,
                    id_sesion: sesionActual.id_sesion,
                    estado,
                });
    
                try {
                    // Crea la asistencia
                    const response = await createAsistencia({
                        id_taller: tallerId,
                        id_estudiante: estudiante.estudiante_id,
                        id_sesion: sesionActual.id_sesion,
                        estado,
                    });
    
                    // Log para confirmar la creación
                    console.log('Asistencia creada:', response);
                } catch (error) {
                    // Log del error específico para un estudiante
                    console.error(
                        `Error al guardar asistencia para estudiante ${estudiante.estudiante_id}:`,
                        error
                    );
                }
            }
    
            alert('Asistencia guardada correctamente.');
            cerrarModalAsistencia(); // Cierra el modal
        } catch (error) {
            console.error('Error general al guardar la asistencia:', error);
            alert('Hubo un error al guardar la asistencia. Intenta nuevamente.');
        }
    };

    const manejarReporte = (sesion) => {
        navigate(`/Home/instructor/reporte/${tallerId}/sesion/${sesion.id_sesion}`);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box p={6} minHeight="100vh">
                <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
                    Lista de Sesiones
                </Typography>

                {error && (
                    <Typography color="error" gutterBottom align="center">
                        {error}
                    </Typography>
                )}

                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <Button variant="contained" color="primary" onClick={() => abrirModalSesion()}>
                        Agregar Nueva Sesión
                    </Button>
                </Box>

                {isLoading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Fecha</TableCell>
                                    <TableCell>Tipo</TableCell>
                                    <TableCell>Detalle</TableCell>
                                    <TableCell>Asistencia</TableCell>
                                    <TableCell>Reporte</TableCell>
                                    <TableCell>Editar</TableCell>
                                    <TableCell>Eliminar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sesiones.map((sesion) => (
                                    <TableRow key={sesion.id_sesion}>
                                        <TableCell>
                                            {new Date(sesion.fecha).toLocaleDateString('es-ES', {
                                                weekday: 'long',
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </TableCell>
                                        <TableCell>{sesion.tipo}</TableCell>
                                        <TableCell>{sesion.detalle}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => manejarAsistencia(sesion)}
                                            >
                                                Asistencia
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => manejarReporte(sesion)}
                                            >
                                                Reporte
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => abrirModalSesion(sesion)}
                                            >
                                                Editar
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => manejarEliminar(sesion.id_sesion)}
                                            >
                                                Eliminar
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {/* Modal para crear/editar sesiones */}
                <Dialog open={openModalSesion} onClose={cerrarModalSesion} maxWidth="md" fullWidth>
                    <DialogTitle>
                        {sesionSeleccionada ? 'Actualizar Sesión' : 'Crear Sesión'}
                    </DialogTitle>
                    <DialogContent>
                        <FormularioSesion sesion={sesionSeleccionada} onSubmit={manejarSubmit} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={cerrarModalSesion} color="secondary">
                            Cancelar
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Modal de asistencia */}
                <Dialog open={openModalAsistencia} onClose={cerrarModalAsistencia} maxWidth="md" fullWidth>
                    <DialogTitle>Asistencia para la sesión</DialogTitle>
                    <DialogContent>
                        {sesionActual ? (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    Detalles de la sesión:
                                </Typography>
                                <Typography>
                                    Fecha: {new Date(sesionActual.fecha).toLocaleString('es-ES')}
                                </Typography>
                                <Typography>Tipo: {sesionActual.tipo}</Typography>
                                <Typography>Detalle: {sesionActual.detalle}</Typography>

                                <Typography variant="h6" gutterBottom mt={2}>
                                    Lista de Asistencia:
                                </Typography>
                                {estudiantes.length > 0 ? (
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>#</TableCell>
                                                    <TableCell>Nombre del Estudiante</TableCell>
                                                    <TableCell>Asistencia</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {estudiantes.map((estudiante, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{estudiante.Nombre}</TableCell>
                                                        <TableCell>
                                                            <select
                                                                id={`asistencia-${estudiante.estudiante_id}`} // ID único para cada select
                                                                defaultValue="ausente"
                                                                style={{
                                                                    padding: '8px',
                                                                    borderRadius: '4px',
                                                                    border: '1px solid #ccc',
                                                                }}
                                                            >
                                                                <option value="presente">Presente</option>
                                                                <option value="ausente">Ausente</option>
                                                            </select>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <Typography>No hay estudiantes inscritos.</Typography>
                                )}
                            </>
                        ) : (
                            <Typography>Cargando información...</Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={cerrarModalAsistencia} color="secondary">
                            Cerrar
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={guardarAsistencia} // Llama al manejador
                        >
                            Guardar Asistencia
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
};

export default VerSesiones;
