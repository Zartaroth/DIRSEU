import * as React from "react";

import Grid from "@mui/material/Grid";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { styled } from "@mui/system";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { createDocenteRequest } from "../../api/api";
import { useEffect } from "react";
import { useRegister } from "../../context/Register_context";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function TeacherForm() {
  const [codigo_docente, setCodigo_docente] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const { user_id } = useParams();

  const activeStep = 0;

  const { isAuthenticated } = useAuth();
  const { userData } = useRegister();
  const goTo = useNavigate();

  useEffect(() => {
    if (isAuthenticated) goTo("/", { replace: true });
    // return <Navigate to="/Home" replace />;
  }, [isAuthenticated]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!userData) {
        console.log("UserData:  Vacio");
        goTo("/register", { replace: true });
        return;
      }

      const response = await createDocenteRequest({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        codigo_docente,
        departamento,
        telefono,
        direccion,
        user_id,
      });

      if (response.ok) {
        console.log("Docente Creado Exitosamente");
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
          autoComplete="given-number"
          name="codigo_docente"
          required
          fullWidth
          id="codigo_docente"
          label="Codigo Docente"
          autoFocus
          value={codigo_docente}
          onChange={(e) => setCodigo_docente(e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          id="departamento"
          label="Departamento"
          name="departamento"
          value={departamento}
          onChange={(e) => setDepartamento(e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          id="telefono"
          label="Telefono"
          name="telefono"
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
