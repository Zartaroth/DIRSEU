import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import Ptarjeta from "../Cart/Ptarjetas";
import ListCategories from "../Product/ListCategories";
import Slider from "../Product/Slider";

import { useEffect, useState } from "react";
import { getProductsRequest, getCategoriesRequest } from "../../api/api";

const Main = () => {
  const [Products, setProducts] = useState([]);
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await getProductsRequest();
      setProducts(response.data);
    }
    loadProducts();

    async function loadCategories() {
      const response = await getCategoriesRequest();
      setCategories(response.data);
    }
    loadCategories();
  }, []);

  return (
    <main>
      <Box>
        <Container maxWidth="100%" sx={{ flexGrow: 1, mx: "auto", my: 5 }}>
          <Slider
            list={Categories}
            id="id_categoria"
            name="nombre_categoria"
            img="imagen_categoria"
          />
        </Container>
        <Box sx={{ display: "flex" }}>
          <Container maxWidth="sm" sx={{ flexGrow: 1, width: "18%" }}>
            <ListCategories
              list={Categories}
              id="id_categoria"
              name="nombre_categoria"
            />
          </Container>
          <Container maxWidth="100%" sx={{ flexGrow: 1, my: "63px" }}>
            <Grid container className="Items" spacing={{ xs: 2, md: 3 }}>
              {Products.map((product) => (
                <Grid
                  xs={12}
                  sm={6}
                  md={3}
                  key={product.id_producto}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ptarjeta
                    nombre={product.nombre_producto}
                    detalles={product.descripcion}
                    boton1={"cotizar"}
                    color={"#222222"}
                    imagen={product.rutaImagen}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </main>
  );
};

export default Main;
