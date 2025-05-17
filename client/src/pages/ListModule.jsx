import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import { Box, Typography } from "@mui/material";
import ButtonImgBase from "../components/components/ButtonImgBase";
import { Outlet, useParams } from "react-router-dom";
import { getTableRequest } from "../api/api";

export default function ListModule() {
  const { table } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    geItems();
  }, [table]);

  async function geItems() {
    try {
      const response = await getTableRequest({ table });
      if (response.ok) {
        const json = await response.json();
        setItems(json.rows);
      } else {
        console.log("Algo ocurrió");
        const json = await response.json();
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Typography component="h1" variant="title1" sx={{ fontWeight: "bold" }}>
          {(table.charAt(0).toUpperCase() + table.slice(1))
            .replace(/_(.)/g, (match, p1) => " " + p1.toUpperCase())
            .replace(/^./, (match) => match.toUpperCase())}
        </Typography>
      </Box>
  
      {/* Cards grid */}
      <Grid container spacing={7} sx={{ textAlign: "center" }}>
        {items.map((item) => (
          <Grid item xs={12} sm={4} md={4} lg={3} key={item.id}>
            <Box
              sx={{
                padding: 2,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <ButtonImgBase
                title={item.nombre}
                url={data.find((d) => d.title === table)?.image || null}
                width="90%"
                to={`/Home/modules/form/${table}/${item.id}`}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Outlet />
    </React.Fragment>
  );
}

const data = [
  {
    title: "talleres",
    image: "https://tallerdigital.cl/wp-content/uploads/2020/06/movil01.png",
    to: "",
  },
  {
    title: "voluntariados",
    image: "https://blog.oxfamintermon.org/wp-content/uploads/2015/01/voluntariado-europeo-oxfam-intermon-2-726x477.jpg",
    to: "",
  },
];
