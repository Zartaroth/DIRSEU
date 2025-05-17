import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Box, Card, Typography, Divider } from "@mui/material";
import { Link, Outlet, useParams } from "react-router-dom";
import { getTableRequest } from "../api/api";

export default function ListInscripciones() {
  const { table } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, [table]);

  async function getItems() {
    try {
      const response = await getTableRequest({ table });

      if (response.ok) {
        const json = await response.json();
        setItems(json.rows);
      } else {
        console.log("Algo Ocurrio");
        const json = await response.json();
        return;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {items.map((item, index) => {
          const itemData = data.find((d) => d.title === table);
          const backgroundImage = itemData ? itemData.image : "";

          return (
            <Grid key={item.id} item xs={12} sx={{ p: 0, m: 0 }}>
              <Link
                to={`/Home/inscripciones/tables/${table}/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 50,
                    p: 0,
                    borderRadius: "0 100px 100px 0",
                    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
                    backgroundSize: "70%",
                    backgroundPosition: "center right",
                    backgroundAttachment: "fixed",
                    color: "#fff",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                      backgroundSize: "100%",
                    },
                  }}
                >
                  <Typography
                    variant="h7"
                    sx={{
                      bgcolor: "rgba(0, 0, 0, 0.7)",
                      height: "100%",
                      width: "20%",
                      pl: 3,
                      ml: 1,
                      display: "flex",
                      alignItems: "center",
                      borderLeft: "2px solid #fff", // Línea entre padding y margen
                      paddingLeft: "10px", // Ajusta el padding entre la línea y el texto
                    }}
                  >
                    {item.nombre}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          );
        })}
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
    title: "capacitaciones",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKuE9ZF_Roc-2BeI1cpIyOuglFDtq8la_jQ&s",
    to: "",
  },
  {
    title: "ofertas_laborales",
    image:
      "https://www.unp.edu.pe/wp-content/uploads/2023/08/bolsa_trabajo.png",
    to: "",
  },
  {
    title: "voluntariados",
    image:
      "https://blog.oxfamintermon.org/wp-content/uploads/2015/01/voluntariado-europeo-oxfam-intermon-2-726x477.jpg",
    to: "",
  },
];
