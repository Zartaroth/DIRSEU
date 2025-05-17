import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import Backdrop from "@mui/material/Backdrop";

import { useNavigate, useParams } from "react-router-dom";
import { getTableByIdRequest, registerInscriptionRequest } from "../api/api";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import FormularioPDF from "../components/administrator/FormularioPDF";

export default function DetailsModules() {
  const [description, setDescription] = useState({});
  const [errorResponse, setErrorResponse] = useState("");

  const { table, id } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    getDescription();
  }, [table, id]);

  async function getDescription() {
    try {
      const response = await getTableByIdRequest({ table, id });
      if (response.ok) {
        const json = await response.json();
        setDescription(json.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleBack = () => navigate(-1);

  const handleSubscribe = async () => {
    try {
      if (auth.getUser().type !== "estudiante") {
        setErrorResponse("Un Docente no puede Inscribirse");
        handleOpen();
        return;
      }

      const response = await registerInscriptionRequest({
        table,
        entidad_id: id,
        estudiante_id: auth.getUser().id,
      });

      const json = await response.json();
      setErrorResponse(response.ok ? json.message : json.error);
      handleOpen();
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [open, setOpen] = React.useState(false);
  const [openCV, setOpenCV] = React.useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleCloseCV = () => setOpenCV(false);
  const handleOpenCV = () => setOpenCV(true);

  const defaultImage = 'https://th.bing.com/th/id/OIP.JKvRJaNFhDO7nu1s_-zieAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1,3';
  const imageUrl = description.imagen ? `${import.meta.env.VITE_API_URL}${description.imagen}` : defaultImage;

  const renderContentByTable = () => {
    return (
      <>
        <Typography variant="h4" sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, fontWeight: 'bold' }}>
          {description.nombre}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: { xs: "0.9rem", sm: "1rem" }, mt: 2 }}>
          {description.descripcion}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>Fecha:</strong> {`${formatDate(description.fecha_inicio)} - ${formatDate(description.fecha_fin)}`}
        </Typography>
        {description.lugar && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Lugar:</strong> {description.lugar}
          </Typography>
        )}
        {description.cupo_maximo && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Cupo Máximo:</strong> {description.cupo_maximo}
          </Typography>
        )}
      </>
    );
  };

  return (
    <React.Fragment>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
        <Typography variant="h6">{errorResponse}</Typography>
      </Backdrop>
      <Grid container sx={{ mx: "auto" }}>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            background: `url(${imageUrl}) center center / cover no-repeat`,
            minHeight: "300px",
            borderRight: { md: "1px solid" },
            borderColor: "divider",
            position: "relative",
          }}
        >
          <Button
            startIcon={<ChevronLeftRoundedIcon />}
            onClick={handleBack}
            variant="contained"
            sx={{
              position: "absolute",
              top: "20px",
              left: "20px",
              zIndex: 1,
              fontSize: { xs: "0.8rem", sm: "1rem" },
            }}
          >
            Regresar
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: { xs: "transparent", md: "background.default" },
            alignItems: "start",
            p: { xs: 2, sm: 4, md: 6 },
            gap: { xs: 2, md: 4 },
          }}
        >
          {renderContentByTable()}
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            {auth.getUser()?.type !== "egresado" ? (
              <Button
                variant="contained"
                endIcon={<ChevronRightRoundedIcon />}
                onClick={handleSubscribe}
                sx={{ width: { xs: "80%", sm: "60%" }, fontSize: { xs: "0.9rem", sm: "1.2rem" }, py: 1 }}
              >
                Inscribirse
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  endIcon={<ContactPageIcon />}
                  onClick={handleOpenCV}
                  sx={{ width: { xs: "80%", sm: "60%" }, fontSize: { xs: "0.9rem", sm: "1.2rem" }, py: 1 }}
                >
                  Generar CV
                </Button>
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openCV}>
                  <Box>
                    <FormularioPDF func={handleCloseCV} />
                  </Box>
                </Backdrop>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
