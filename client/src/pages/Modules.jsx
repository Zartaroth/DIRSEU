import React from "react";
import Grid from '@mui/material/Grid';

import { Box, Card, Typography } from "@mui/material";

import ButtonImgBase from "../components/components/ButtonImgBase";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Modules() {
  const auth = useAuth();

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Typography component="h1" variant="title1" sx={{ fontWeight: "bold" }}>
          MODULOS
        </Typography>
      </Box>
      {/* cards */}

      <Grid container spacing={2} columns={5} sx={{ textAlign: "center" }}>
        {data.map((card, index) => {
          const cardTypes = card.type.split(",");

          if (cardTypes.includes(auth.getUser()?.type)) {
            return (
              <Grid item xs={6} sm={3} md={2} lg={2.25} key={index}>
                <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
                  <ButtonImgBase
                    title={card.title}
                    url={card.image}
                    width="100%"
                    to={card.to}
                  />
                </Card>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
      <Box sx={{ px: "10%", my: 4 }}>
        <Outlet />
      </Box>
    </React.Fragment>
  );
}

const data = [
  {
    type: "estudiante,docente",
    title: "Taller",
    image: "https://tallerdigital.cl/wp-content/uploads/2020/06/movil01.png",
    to: "list/talleres",
  },
  {
    type: "estudiante,docente",
    title: "Voluntariado",
    image:
      "https://blog.oxfamintermon.org/wp-content/uploads/2015/01/voluntariado-europeo-oxfam-intermon-2-726x477.jpg",
    to: "list/voluntariados",
  },
];
