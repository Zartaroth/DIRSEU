import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { accesUserRequest } from "../api/api";
import { useState } from "react";

const defaultTheme = createTheme();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { saveUser, getUser } = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
  
    if (!email || !password) {
      setErrorResponse("Por favor, complete todos los campos.");
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await accesUserRequest({ email, password });
  
      if (!response) {
        setErrorResponse("Error al procesar la solicitud. Inténtelo de nuevo.");
        setIsLoading(false);
        return;
      }
  
      if (response.ok) {
        setErrorResponse("");
        const json = await response.json();
        if (json.accessToken && json.refreshToken) {
          saveUser(json);
  
          // Redirigir según el tipo de usuario
          const userType = json.user.role;
          console.log(userType);
          if (userType === "egresado") {
            goTo("/Alumni/Inicio", { replace: true });
          } else {
            goTo("/Home", { replace: true });
          }
        }
      } else {
        const json = await response.json();
        setErrorResponse(json.error || "Error en el inicio de sesión");
      }
    } catch (error) {
      setErrorResponse("Error de conexión con el servidor");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh", p: 0, m: 0 }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://mentor.pe/wp-content/uploads/2023/09/UAC-frontis.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backdropFilter: "blur(3px)",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={10}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              src="https://upload.wikimedia.org/wikipedia/commons/e/e4/CRSL_01.png"
              sx={{ m: 1, width: 120, height: 120 }}
            />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {!!errorResponse && (
              <Alert severity="error" sx={{ width: "90%", my: 2 }}>
                {errorResponse}
              </Alert>
            )}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/forgot-password" variant="body2">
                    Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register">
                    {"No tienes una cuenta? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            {/* Botón para regresar */}
            <Button
              variant="outlined"
              sx={{ mt: 5 }}
              onClick={() => goTo(-1)} // Navegar a la página anterior
            >
              Regresar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
