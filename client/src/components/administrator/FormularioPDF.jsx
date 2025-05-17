import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../paginas/images/UAC.png";
import generatePDF from "./cvTemplate"; // Importar la función de generación de PDF
import { useAuth } from "../../context/AuthProvider";

export default function FormularioPDF(props) {
  const [experienciaLaboral, setExperienciaLaboral] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [otros, setOtros] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const { func } = props;

  const auth = useAuth();
  const user = auth.getUser();

  const handleCerrarClick = () => {
    if (func) {
      func(); // Llama a la función handleCloseCV que se pasó como prop
    }
  };

  const handleGeneratePDF = () => {
    generatePDF({
      egresadoData: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        codigo: user.codigo,
        carrera: user.carrera,
        promocion: user.promocion,
        telefono: user.telefono,
        direccion: user.direccion,
      },
      experienciaLaboral,
      habilidades,
      otros,
      descripcion,
      logo: Logo,
    });
  };

  return (
    <Box
      p={6}
      boxShadow={3}
      borderRadius={4}
      sx={{
        display: "flex",
        width: "80%",
        flexDirection: "column",
        backgroundColor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
        alignItems: "start",
        p: 5,
        m: "auto",
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{
            fontFamily: "Arial Black",
            color: "#333",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}
        >
          Formulario para Generar PDF
        </Typography>
        <IconButton
          onClick={handleCerrarClick}
          sx={{ color: "black" }} // Cambia el color del ícono a negro
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2}>
        {/* Campos del formulario */}
        <Grid item xs={12} md={6}>
          <TextField
            name="experienciaLaboral"
            required
            fullWidth
            id="experienciaLaboral"
            label="Experiencia Laboral"
            multiline
            rows={6} // Número de líneas visibles inicialmente
            variant="outlined"
            value={experienciaLaboral}
            onChange={(e) => setExperienciaLaboral(e.target.value)}
            InputProps={{
              style: { minHeight: "120px" }, // Establece la altura mínima
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            id="habilidades"
            label="Habilidades"
            multiline
            rows={6}
            variant="outlined"
            value={habilidades}
            onChange={(e) => setHabilidades(e.target.value)}
            InputProps={{
              style: { minHeight: "120px" },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            id="otros"
            label="Otros"
            multiline
            rows={6}
            variant="outlined"
            value={otros}
            onChange={(e) => setOtros(e.target.value)}
            InputProps={{
              style: { minHeight: "120px" },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            id="descripcion"
            label="Descripción"
            multiline
            rows={6}
            variant="outlined"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            InputProps={{
              style: { minHeight: "120px" },
            }}
          />
        </Grid>
      </Grid>
      {/* Botón para generar PDF */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button variant="contained" color="primary" onClick={handleGeneratePDF}>
          Enviar PDF
        </Button>
      </Box>
    </Box>
  );
}
