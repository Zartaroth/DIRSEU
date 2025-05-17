import * as React from "react";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { styled } from "@mui/system";
import { Alert, Box, Button, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { createUserRequest } from "../../api/api";
import { useEffect } from "react";
import { useRegister } from "../../context/Register_context";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function UserForm() {
  const [firstName, setFirtsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  // const activeStep = 0;

  const { isAuthenticated } = useAuth();
  const { setUserData } = useRegister();
  const goTo = useNavigate();

  useEffect(() => {
    if (isAuthenticated) goTo("/", { replace: true });
    // return <Navigate to="/Home" replace />;
  }, [isAuthenticated]);

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      if (!firstName || !lastName || !email || !password) {
        setErrorResponse("Todos los campos son requeridos");
        return;
      }
  
      // Guardar los datos básicos del usuario sin el rol
      setUserData({
        firstName,
        lastName,
        email,
        password,
      });
  
      // Redirigir al siguiente paso (selección de tipo de usuario)
      goTo("type");
    } catch (error) {
      console.error(error);
    }
  }

  function handlePrevious() {
    setActiveStep((prevStep) => Math.max(prevStep - 1, 0)); // Asegura que no baje de 0
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
          autoComplete="given-name"
          name="firstName"
          required
          fullWidth
          id="firstName"
          label="First Name"
          autoFocus
          value={firstName}
          onChange={(e) => setFirtsName(e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="family-name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGrid>

      <FormGrid item xs={6}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Aceptar terminos y condiciones"
        />
      </FormGrid>
      <FormGrid item xs={6} justifyContent="flex-end">
        <Grid sx={{ textAlign: "right", my: "auto" }}>
          <Link to={"/login"}>Already have an account? Sign in</Link>
        </Grid>
      </FormGrid>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: activeStep > 0 ? "space-between" : "flex-end",
          alignItems: "end",
          flexGrow: 1,
          gap: 1,
          pb: { xs: 12, sm: 0 },
          mt: "60px",
        }}
      >
        {activeStep > 0 && (
          <Button
            startIcon={<ChevronLeftRoundedIcon />}
            onClick={handlePrevious}
            variant="text"
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            Previous
          </Button>
        )}
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
