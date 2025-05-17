// src/pages/NotAuthorized.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        No Autorizado
      </Typography>
      <Typography variant="body1" gutterBottom>
        No tienes permiso para acceder a esta página.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Volver al Inicio
      </Button>
    </Box>
  );
};

export default NotAuthorized;