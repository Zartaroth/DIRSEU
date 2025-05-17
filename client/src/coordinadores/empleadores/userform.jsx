import * as React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Outlet, useNavigate } from "react-router-dom";
import { useRegister } from "../../context/Register_context";
import { styled } from "@mui/system";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function UserFormEmpleador() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const activeStep = 0; // Puedes modificar esto según el flujo de tu aplicación
  const { setUserData } = useRegister();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password ) {
      setErrorResponse("Todos los campos son requeridos.");
      return;
    }

    setUserData({
      firstName,
      lastName,
      email,
      password,
      role: "empleador",
    });

    navigate("/Home/coordinadores/SeguimientoEgresado/agregarEmpleador");
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: { xs: "100%", sm: "80%", md: "60%" },
        mx: "auto",
      }}
    >
      {/* Mensaje de error si existe */}
      {!!errorResponse && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorResponse}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Nombre */}
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            id="firstName"
            label="Nombre"
            autoComplete="new-given-name" // Cambia el valor para nombres
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>

        {/* Apellido */}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Apellido"
            name="lastName"
            autoComplete="family-name" // Especifica el tipo de autocompletado
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email" // Especifica el tipo de autocompletado
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>

        {/* Contraseña */}
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password" // Especifica el tipo de autocompletado
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Botones de navegación */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: activeStep !== 0 ? "space-between" : "flex-end",
          alignItems: "center",
          mt: 3,
        }}
      >
        {activeStep !== 0 && (
          <Button
            startIcon={<ChevronLeftRoundedIcon />}
            variant="text"
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            Anterior
          </Button>
        )}

        <Button
          type="submit"
          variant="contained"
          endIcon={<ChevronRightRoundedIcon />}
          sx={{
            width: { xs: "100%", sm: "fit-content" },
          }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
}
