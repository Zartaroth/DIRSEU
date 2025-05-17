import * as React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEmpleadorRequest } from "../../api/api";
import { useRegister } from "../../context/Register_context";

import {
  Grid,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Alert,
} from "@mui/material";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

export default function EmployerForm() {
  const [codigo_empleador, setCodigoEmpleador] = useState("");
  const [nombre_empresa, setNombreEmpresa] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion_empresa, setDireccionEmpresa] = useState("");
  const [area_negocio, setAreaNegocio] = useState("");
  const [email_empresa, setEmailEmpresa] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const { user_id } = useParams();
  const { userData } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!codigo_empleador || !nombre_empresa) {
      setErrorResponse("Campos Requeridos: Código Empleador, Nombre de la Empresa");
      return;
    }

    if (!userData) {
      console.log("UserData: Vacio");
      navigate("/Home/coordinadores/SeguimientoEgresado/userEmForm", { replace: true });
      return;
    }

    try {
      const response = await createEmpleadorRequest({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        codigo_empleador,
        nombre_empresa,
        telefono,
        direccion_empresa,
        area_negocio,
        email_empresa,
        user_id,
      });

      if (response.ok) {
        setErrorResponse("");
        navigate('/Home/coordinadores/SeguimientoEgresado');
      } else {
        const json = await response.json();
        setErrorResponse(json.error || "Error desconocido al crear el empleador.");
      }
    } catch (error) {
      console.error(error);
      setErrorResponse("Ocurrió un error inesperado.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: { xs: "100%", sm: "80%", md: "60%" },
        mx: "auto",
      }}
    >
      {!!errorResponse && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorResponse}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="codigo_empleador"
            label="Código del Empleador"
            value={codigo_empleador}
            onChange={(e) => setCodigoEmpleador(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="nombre_empresa"
            label="Nombre de la Empresa"
            value={nombre_empresa}
            onChange={(e) => setNombreEmpresa(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="telefono"
            label="Teléfono"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="direccion_empresa"
            label="Dirección de la Empresa"
            value={direccion_empresa}
            onChange={(e) => setDireccionEmpresa(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="area_negocio"
            label="Área de Negocio"
            value={area_negocio}
            onChange={(e) => setAreaNegocio(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="email_empresa"
            label="Correo Electrónico de la Empresa"
            type="email"
            value={email_empresa}
            onChange={(e) => setEmailEmpresa(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox required name="acceptTerms" />}
            label="Aceptar términos y condiciones"
          />
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              endIcon={<ChevronRightRoundedIcon />}
              sx={{ px: 3, py: 1 }}
            >
              Registrar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
