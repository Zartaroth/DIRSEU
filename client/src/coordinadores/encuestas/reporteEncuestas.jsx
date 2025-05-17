import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRespuestasByEncuestaId } from '../../api/respuesta';
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
import { Pie } from 'react-chartjs-2'; // Importar componente Pie para gráficos
import * as XLSX from 'xlsx';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ReportesEncuesta = () => {
  const { encuestaId } = useParams();
  const [respuestasData, setRespuestasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRespuestas = async () => {
      try {
        const response = await getRespuestasByEncuestaId(encuestaId);
        if (response.success) {
          setRespuestasData(response.data || []);
        } else {
          throw new Error('Error al cargar las respuestas.');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRespuestas();
  }, [encuestaId]);

  const exportToExcel = () => {
    const formattedData = [];
    const maxRows = Math.max(...respuestasData.map((item) => item.respuestas.length));

    for (let i = 0; i < maxRows; i++) {
      const row = {};
      respuestasData.forEach((preguntaItem) => {
        row[preguntaItem.pregunta] =
          preguntaItem.respuestas[i] ? preguntaItem.respuestas[i].respuesta : '';
      });
      formattedData.push(row);
    }

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    XLSX.writeFile(workbook, `Reporte_Encuesta_${encuestaId}.xlsx`);
  };

  const generateChartData = (respuestas) => {
    const counts = respuestas.reduce((acc, respuesta) => {
      acc[respuesta.respuesta] = (acc[respuesta.respuesta] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(counts),
      datasets: [
        {
          data: Object.values(counts),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
          ],
        },
      ],
    };
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Respuestas de la Encuesta
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={exportToExcel}
      >
        Descargar Reporte en Excel
      </Button>
      {respuestasData.length > 0 ? (
        respuestasData.map((preguntaItem, index) => (
          <Card key={index} sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                {/* Primera columna: Preguntas y respuestas */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Pregunta: {preguntaItem.pregunta}
                  </Typography>
                  <List>
                    {preguntaItem.respuestas.map((respuesta, idx) => (
                      <ListItem key={idx} sx={{ borderBottom: '1px solid #eee' }}>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight="bold">
                              Respuesta: {respuesta.respuesta}
                            </Typography>
                          }
                          secondary={`Usuario: ${respuesta.usuario}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                {/* Segunda columna: Gráfico */}
                <Grid item xs={12} md={6}>
                  {preguntaItem.tipo === 'opcion_multiple' && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Pie data={generateChartData(preguntaItem.respuestas)} />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        <Alert severity="info">No hay respuestas disponibles para esta encuesta.</Alert>
      )}
    </Container>
  );
};

export default ReportesEncuesta;
