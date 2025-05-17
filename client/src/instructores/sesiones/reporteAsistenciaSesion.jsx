import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAsistenciasDetalladas } from '../../api/asistencia';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Alert,
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Grid,
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import * as XLSX from 'xlsx';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportesAsistenciaSesion = () => {
    const { tallerId, sesionId } = useParams();
    const [asistenciasData, setAsistenciasData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAsistencias = async () => {
            try {
                const response = await getAsistenciasDetalladas(tallerId, sesionId);
                setAsistenciasData(response); // El backend ya devuelve un arreglo con las sesiones
            } catch (err) {
                setError('Error al cargar las asistencias: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAsistencias();
    }, [tallerId, sesionId]);

    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(asistenciasData.flatMap(sesion =>
            sesion.asistencias.map(asistencia => ({
                Sesión: sesion.id_sesion,
                Taller: sesion.taller,
                Fecha: new Date(sesion.fecha).toLocaleDateString(),
                Estudiante: asistencia.nombre_completo_estudiante,
                Estado: asistencia.estado,
            }))
        ));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Asistencias');
        XLSX.writeFile(workbook, `Reporte_Asistencias_Taller_${tallerId}_Sesion_${sesionId}.xlsx`);
    };

    const renderChart = () => {
        const estados = asistenciasData.flatMap(sesion =>
            sesion.asistencias.map(asistencia => asistencia.estado)
        );
        const conteoEstados = estados.reduce((acc, estado) => {
            acc[estado] = (acc[estado] || 0) + 1;
            return acc;
        }, {});

        const data = {
            labels: Object.keys(conteoEstados),
            datasets: [
                {
                    label: 'Distribución de Asistencias',
                    data: Object.values(conteoEstados),
                    backgroundColor: ['#4caf50', '#f44336', '#ffeb3b', '#2196f3'],
                },
            ],
        };

        return <Pie data={data} />;
    };

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>
                Reporte de Asistencias
            </Typography>
            <Button variant="contained" color="primary" onClick={handleExportToExcel}>
                Exportar a Excel
            </Button>
            <Box mt={4}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Gráfico de Asistencias</Typography>
                        {renderChart()}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Detalles de Asistencias</Typography>
                        {asistenciasData.map(sesion => (
                            <Card key={sesion.id_sesion} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="subtitle1">
                                        Taller: {sesion.taller}
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Fecha: {new Date(sesion.fecha).toLocaleDateString()}
                                    </Typography>
                                    <List>
                                        {sesion.asistencias.map(asistencia => (
                                            <ListItem key={asistencia.id_estudiante}>
                                                <ListItemText
                                                    primary={asistencia.nombre_completo_estudiante}
                                                    secondary={`Estado: ${asistencia.estado}`}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ReportesAsistenciaSesion;
