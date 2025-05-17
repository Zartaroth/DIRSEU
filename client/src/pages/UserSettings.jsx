import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useAuth } from "../context/AuthProvider";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        position: "fixed",
        bottom: { xs: 16, sm: 24 },
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Toggle design language"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value>Custom theme</ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function UserSettings() {
  const auth = useAuth();

  if (!auth.getUser()) {
    return "";
  }

  const userData = auth.getUser();
  const keys = Object.keys(userData);
  const usuarioKeys = keys.slice(2, 5); 
  const otrosDatosKeys = keys.slice(8, keys.length - 1); 

  return (
    <React.Fragment>
      <Grid container sx={{ justifyContent: "center", alignItems: "center" }}>
        <Grid
          item
          xs={12}
          md={7}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            backgroundColor: "background.paper",
            alignItems: "start",
            py: { xs: 1, md: 2 },
            px: { xs: 2, md: 4 },
          }}
        >
          <Box p={{ xs: 2, md: 6 }} boxShadow={3} borderRadius={4} width="100%" sx={{ mt: 6 }}>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{
                fontFamily: "Arial Black",
                color: "text.primary",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Perfil de Usuario
            </Typography>
            <Box display="flex" flexDirection={{ xs: "column", md: "row" }} alignItems="center" mb={4}>
              <Avatar sx={{ bgcolor: "primary.main", color: "background.paper" }}>
                {userData.type === "estudiante" ? <SchoolIcon /> : <PersonIcon />}
              </Avatar>
              <Typography
                variant="h5"
                sx={{
                  pl: { xs: 0, md: 2 },
                  my: { xs: 2, md: 0 },
                  fontFamily: "Arial",
                  color: "text.primary",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {userData.type.toUpperCase()}
              </Typography>
            </Box>
            <Divider />
            <Box py={4}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3, fontFamily: "Arial", color: "text.primary", fontSize: { xs: "1.2rem", md: "1.5rem" } }}>
                DATOS DEL USUARIO
              </Typography>
              <Grid container spacing={2} sx={{ pl: { xs: 1, md: 4 } }}>
                {usuarioKeys.map((key) => (
                  <React.Fragment key={key}>
                    <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                      {renderIcon(key)}
                      <Typography sx={{ ml: 1, color: "text.primary" }}>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ color: "text.secondary" }}>{userData[key]}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
            <Divider />
            <Box py={4}>
              <Typography variant="h6" gutterBottom sx={{ mb: 3, fontFamily: "Arial", color: "text.primary", fontSize: { xs: "1.2rem", md: "1.5rem" } }}>
                DATOS DEL {userData.type.toUpperCase()}
              </Typography>
              <Grid container spacing={2} sx={{ pl: { xs: 1, md: 4 } }}>
                {otrosDatosKeys.map((key) => (
                  <React.Fragment key={key}>
                    <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
                      {renderIcon(key)}
                      <Typography sx={{ ml: 1, color: "text.primary" }}>
                        <strong>
                          {(key.charAt(0).toUpperCase() + key.slice(1))
                            .replace(/_(.)/g, (match, p1) => " " + p1.toUpperCase())
                            .replace(/^./, (match) => match.toUpperCase())}
                        </strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ color: "text.secondary" }}>{userData[key]}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function renderIcon(key) {
  switch (key) {
    case "email":
      return <EmailIcon />;
    case "direccion":
      return <LocationOnIcon />;
    case "telefono":
      return <PhoneIcon />;
    case "fecha_nacimiento":
      return <DateRangeIcon />;
    default:
      return <AccountCircleIcon />;
  }
}
