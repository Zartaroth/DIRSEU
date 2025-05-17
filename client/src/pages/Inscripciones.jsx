import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import ButtonImgBase from "../components/components/ButtonImgBase";
import { Outlet } from "react-router-dom";

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
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
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme
        </ToggleButton>
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

export default function Inscripciones() {
  return (
    <React.Fragment>
      <Grid container sx={{ mx: "auto" }}>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: "1px solid",
            borderColor: "divider",
            alignItems: "start",
            pt: 4,
            px: 5,
            gap: 2,
          }}
        >
          {data.map((card, index) => (
            <Grid key={index}>
              {" "}
              {/* Asegúrate de agregar key prop */}
              <Card variant="outlined" sx={{ flexGrow: 1 }}>
                <ButtonImgBase
                  title={card.title}
                  url={card.image}
                  width="100%"
                  height="130px"
                  to={card.to}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          sm={12}
          md={7}
          lg={8.6}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            p: 4,
            gap: 4,
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const data = [
  {
    title: "Taller",
    image: "https://tallerdigital.cl/wp-content/uploads/2020/06/movil01.png",
    to: "talleres",
  },
  {
    title: "Capacitacion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKuE9ZF_Roc-2BeI1cpIyOuglFDtq8la_jQ&s",
    to: "capacitaciones",
  },
  {
    title: "Oferta Laboral",
    image:
      "https://www.unp.edu.pe/wp-content/uploads/2023/08/bolsa_trabajo.png",
    to: "ofertas_laborales",
  },
  {
    title: "Voluntariado",
    image:
      "https://blog.oxfamintermon.org/wp-content/uploads/2015/01/voluntariado-europeo-oxfam-intermon-2-726x477.jpg",
    to: "voluntariados",
  },
];
