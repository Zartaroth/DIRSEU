import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  RadioGroup,
  Radio,
  Checkbox,
  FormControl,
  FormControlLabel,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { obtenerEncuesta } from "../../../api/encuestas";
import { getPreguntasByEncuestaId } from "../../../api/preguntas";
import { createRespuesta } from "../../../api/respuesta";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../../context/AuthProvider";

export default function EncuestaResponder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [encuesta, setEncuesta] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false); // Estado para controlar el diálogo
  const { getUser } = useAuth();
  const userData = getUser();
  const idUsuario = userData?.user_id;

  useEffect(() => {
    const fetchEncuestaData = async () => {
      try {
        const { data: encuestaData } = await obtenerEncuesta(id);
        setEncuesta(encuestaData);

        const preguntasData = await getPreguntasByEncuestaId(id);
        setPreguntas(preguntasData);
      } catch (error) {
        console.error("Error al cargar la encuesta o las preguntas:", error);
        toast.error("Hubo un problema al cargar la encuesta.");
      }
    };

    fetchEncuestaData();
  }, [id]);

  const handleInputChange = (preguntaId, value) => {
    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: value,
    }));
  };

  const handleCheckboxChange = (preguntaId, opcionId, isChecked) => {
    setRespuestas((prev) => {
      const currentRespuestas = prev[preguntaId] || [];
      return {
        ...prev,
        [preguntaId]: isChecked
          ? [...currentRespuestas, opcionId]
          : currentRespuestas.filter((id) => id !== opcionId),
      };
    });
  };

  const handleSubmit = async () => {
    if (!idUsuario) {
      toast.error("Usuario no autenticado.");
      return;
    }

    for (const [preguntaId, respuesta] of Object.entries(respuestas)) {
      const data = {
        encuesta_id: id,
        pregunta_id: preguntaId,
        usuario_id: idUsuario,
        respuesta: Array.isArray(respuesta) ? respuesta.join(", ") : respuesta,
      };

      try {
        await createRespuesta(data);
        console.log(`Respuesta para pregunta ${preguntaId} guardada exitosamente`);
      } catch (error) {
        console.error("Error al guardar la respuesta para pregunta", preguntaId, error);
        toast.error(`Hubo un problema al guardar la respuesta para la pregunta ${preguntaId}.`);
      }
    }

    // Mostrar el diálogo de confirmación
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate("/Alumni/encuestas"); // Redirige a la lista de encuestas
  };

  const handleBackClick = () => {
    navigate(-1); // Regresa a la página anterior
  };

  if (!encuesta)
    return (
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        Cargando...
      </Typography>
    );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 12 }}>
      <Card sx={{ maxWidth: 700, width: "100%", p: 3, boxShadow: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Button variant="outlined" onClick={handleBackClick}>
            Regresar
          </Button>
        </Box>
        <CardHeader
          title={encuesta?.titulo || "Título no disponible"}
          subheader={encuesta?.descripcion || "Descripción no disponible"}
          titleTypographyProps={{ variant: "h4", align: "center", color: "primary" }}
          subheaderTypographyProps={{ variant: "subtitle1", align: "center", color: "text.secondary" }}
        />
        <CardContent>
          {preguntas.map((pregunta) => (
            <FormControl key={pregunta.id} component="fieldset" fullWidth sx={{ my: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {pregunta.texto}
              </Typography>

              {pregunta.tipo === "texto" && (
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Escribe tu respuesta"
                  onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
                  sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
                />
              )}

              {pregunta.tipo === "opcion_multiple" && (
                <RadioGroup
                  name={`pregunta-${pregunta.id}`}
                  onChange={(e) => handleInputChange(pregunta.id, e.target.value)}
                >
                  {pregunta.opciones?.map((opcion) => (
                    <FormControlLabel
                      key={opcion.id}
                      value={opcion.id}
                      control={<Radio />}
                      label={opcion.texto}
                    />
                  ))}
                </RadioGroup>
              )}

              {pregunta.tipo === "casillas" && (
                <Box>
                  {pregunta.opciones?.map((opcion) => (
                    <FormControlLabel
                      key={opcion.id}
                      control={
                        <Checkbox
                          onChange={(e) =>
                            handleCheckboxChange(pregunta.id, opcion.id, e.target.checked)
                          }
                        />
                      }
                      label={opcion.texto}
                    />
                  ))}
                </Box>
              )}
            </FormControl>
          ))}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 4, py: 1.5 }}
          >
            Enviar Respuestas
          </Button>
        </CardContent>

        {/* Dialog de confirmación */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>¡Respuestas enviadas!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Gracias por completar la encuesta. Tus respuestas han sido enviadas correctamente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" autoFocus>
              Ir al listado de encuestas
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer />
      </Card>
    </Box>
  );
}
