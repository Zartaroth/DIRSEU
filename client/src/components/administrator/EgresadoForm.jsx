import * as React from "react";

import Grid from "@mui/material/Grid";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { styled } from "@mui/system";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { createEgresadoRequest } from "../../api/api";
import { useEffect } from "react";
import { useRegister } from "../../context/Register_context";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function EgresadoForm() {
  const [codigo, setCodigo] = useState("");
  const [carrera, setCarrera] = useState("");
  const [promocion, setPromocion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const activeStep = 0;

  const { isAuthenticated } = useAuth();
  const { userData } = useRegister();
  const goTo = useNavigate();

  useEffect(() => {
    if (isAuthenticated) goTo("/", { replace: true });
  }, [isAuthenticated]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!userData) {
        console.log("UserData:  Vacio");
        goTo("/register", { replace: true });
        return;
      }
      console.log(userData.role)
      const response = await createEgresadoRequest({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        codigo,
        carrera,
        promocion,
        telefono,
        direccion,
      });

      if (response.ok) {
        console.log("Egresado Creado Exitosamente");
        setErrorResponse("");

        goTo("/login");
      } else {
        console.log("Algo Ocurrio");
        const json = await response.json();
        setErrorResponse(json.error);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Grid container spacing={3}>
      {!!errorResponse && (
        <FormGrid item xs={12}>
          <Alert severity="error" sx={{ width: "90%", my: 2, mx: "auto" }}>
            {errorResponse}
          </Alert>
        </FormGrid>
      )}
      <FormGrid item xs={12} md={6}>
        <TextField
          name="codigo"
          required
          fullWidth
          id="codigo"
          label="Codigo Alumno"
          autoFocus
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          id="carrera"
          label="Carrera"
          name="carrera"
          value={carrera}
          onChange={(e) => setCarrera(e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          name="promocion"
          label="Año Promocion"
          id="promocion"
          type="number"
          value={promocion}
          onChange={(e) => setPromocion(e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          name="telefono"
          label="Telefono"
          id="telefono"
          type="number"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <TextField
          required
          fullWidth
          name="direccion"
          label="Direccion"
          id="direccion"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </FormGrid>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: activeStep !== 0 ? "space-between" : "flex-end",
          alignItems: "end",
          flexGrow: 1,
          gap: 1,
          pb: { xs: 12, sm: 0 },
          mt: "60px",
          pl: 3,
        }}
      >
        <Button
          variant="contained"
          endIcon={<ChevronRightRoundedIcon />}
          onClick={handleSubmit}
          sx={{
            width: { xs: "100%", sm: "fit-content" },
          }}
        >
          Next
        </Button>
      </Box>
    </Grid>
  );
}
