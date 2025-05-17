import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import { obtenerEncuestas, obtenerEncuestasValidas } from "../../../api/encuestas";
import { Assignment } from "@mui/icons-material";

export default function EncuestasList() {
  const [encuestas, setEncuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function cargarEncuestas() {
      try {
        const response = await obtenerEncuestasValidas();
        console.log("Datos de la API:", response.data);
        setEncuestas(response.data);
      } catch (error) {
        console.error("Error al cargar encuestas:", error);
        setEncuestas([]);
      } finally {
        setLoading(false);
      }
    }
    cargarEncuestas();
  }, []);

  const handleResponderClick = (id) => {
    navigate(`/Alumni/encuestas/${id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom py={4}>
        Encuestas Disponibles
      </Typography>

      {encuestas.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No hay encuestas disponibles en este momento.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {encuestas.map((encuesta) => (
            <Grid item xs={12} sm={6} md={4} key={encuesta.id}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardHeader
                  title={encuesta.titulo}
                  sx={{ backgroundColor: "#f5f5f5", color: "#333" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    {encuesta.descripcion || "Sin descripción disponible"}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Assignment />}
                    onClick={() => handleResponderClick(encuesta.id)}
                  >
                    Responder Encuesta
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
