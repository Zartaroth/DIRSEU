import React, { useEffect, useState } from "react";
import { 
  Grid, List, ListItem, ListItemIcon, ListItemText, Chip, Paper, Card, Typography, Button, Modal, Box, Table, TableHead, TableRow, TableCell, TableBody, 
  CardContent, CardHeader, Divider, LinearProgress, Tooltip } from "@mui/material";
import Language from "@mui/icons-material/Language";
import Star from "@mui/icons-material/Star";
import { Email, Phone, School, Work, Business, CalendarToday } from '@mui/icons-material';
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import { obtenerOfertasPorUsuario } from "../api/empleos.js";
import { getPostulacionesByOferta } from "../api/postulaciones.js";
import {
  getFormacionesByEgresadoRequest,
  getExperienciasByEgresadoRequest,
  getHabilidadesByEgresadoRequest,
  getIdiomasByEgresadoRequest,
  getLogrosByEgresadoRequest,
} from "../api/CV.js";
import { useAuth } from "../context/AuthProvider.jsx";
import { useTheme } from "@mui/material/styles";

export default function VerPostulantes() {
  const { getUser } = useAuth();
  const usuarioAutenticado = getUser();

  const [isLoading, setIsLoading] = useState(true);
  const [ofertas, setOfertas] = useState([]);
  const [postulantes, setPostulantes] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOferta, setSelectedOferta] = useState(null);
  const [cvData, setCvData] = useState(null); // Datos del CV para mostrar
  const theme = useTheme();

  const cargarOfertasLaborales = async () => {
    try {
      if (!usuarioAutenticado || !usuarioAutenticado.user_id) {
        return;
      }
      setIsLoading(true);
      const response = await obtenerOfertasPorUsuario(usuarioAutenticado.user_id);
      setOfertas(response.data);
    } catch (error) {
      console.error("Error al cargar las ofertas laborales:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cargarDatosCV = async (egresadoId, postulante) => {
    try {
      const [formaciones, experiencias, habilidades, idiomas, logros] = await Promise.all([
        getFormacionesByEgresadoRequest(egresadoId),
        getExperienciasByEgresadoRequest(egresadoId),
        getHabilidadesByEgresadoRequest(egresadoId),
        getIdiomasByEgresadoRequest(egresadoId),
        getLogrosByEgresadoRequest(egresadoId),
      ]);

      setCvData({
        informacionPersonal: {
          nombre: postulante.nombre_completo,
          email: postulante.correo_usuario,
          telefono: postulante.telefono_egresado,
          carrera: postulante.carrera_egresado,
        },
        experienciasLaborales: experiencias || [],  // Asegurarse de que sean arrays
        formacionAcademica: formaciones || [],  // Asegurarse de que sean arrays
        habilidades: habilidades || [],  // Asegurarse de que sean arrays
        idiomas: idiomas || [],  // Asegurarse de que sean arrays
        logros: logros || [],  // Asegurarse de que sean arrays
      });
    } catch (error) {
      console.error("Error al cargar los datos del CV:", error);
      setCvData({
        informacionPersonal: {
          nombre: postulante.nombre_completo,
          email: postulante.correo_usuario,
          telefono: postulante.telefono_egresado,
          carrera: postulante.carrera_egresado,
        },
        experienciasLaborales: [],
        formacionAcademica: [],
        habilidades: [],
        idiomas: [],
        logros: [],
      });
    }
  };

  useEffect(() => {
    cargarOfertasLaborales();
  }, [usuarioAutenticado]);

  const handleOpenModal = async (ofertaId) => {
    try {
      const response = await getPostulacionesByOferta(ofertaId);
      setPostulantes(response);
      setSelectedOferta(ofertaId);
      setOpen(true);
    } catch (error) {
      console.error("Error al cargar los postulantes:", error);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setPostulantes([]);
  };

  const handleVerCV = (egresadoId, postulante) => {
    cargarDatosCV(egresadoId, postulante);
  };

  const calcularDiferencia = (fechaInicio, fechaFin) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    
    const diferencia = {
      años: fin.getFullYear() - inicio.getFullYear(),
      meses: fin.getMonth() - inicio.getMonth(),
      dias: fin.getDate() - inicio.getDate(),
    };
  
    // Ajustar los valores de meses y días en caso de que el valor sea negativo
    if (diferencia.dias < 0) {
      diferencia.dias += new Date(fin.getFullYear(), fin.getMonth(), 0).getDate();
      diferencia.meses--;
    }
  
    if (diferencia.meses < 0) {
      diferencia.meses += 12;
      diferencia.años--;
    }
  
    // Generamos un array solo con los valores que sean mayores a 0
    let periodo = [];
    if (diferencia.años > 0) periodo.push(`${diferencia.años} año${diferencia.años > 1 ? 's' : ''}`);
    if (diferencia.meses > 0) periodo.push(`${diferencia.meses} mes${diferencia.meses > 1 ? 'es' : ''}`);
    if (diferencia.dias > 0) periodo.push(`${diferencia.dias} día${diferencia.dias > 1 ? 's' : ''}`);
  
    return periodo.join(', ') || "Sin duración";
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {ofertas.map((oferta) => (
          <Grid key={oferta.id} item xs={12}>
            <Card
              variant="outlined"
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">{oferta.nombre}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenModal(oferta.id)}
              >
                Ver Postulantes
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para mostrar los postulantes */}
      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={modalStyle(theme)}>
          <Typography variant="h6" gutterBottom>
            Postulantes para la oferta
          </Typography>
          {postulantes.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre Completo</TableCell>
                  <TableCell>Carrera</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Fecha de Postulación</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {postulantes.map((postulante) => (
                  <TableRow key={postulante.postulacion_id}>
                    <TableCell>{postulante.nombre_completo}</TableCell>
                    <TableCell>{postulante.carrera_egresado}</TableCell>
                    <TableCell>{postulante.estado_postulacion}</TableCell>
                    <TableCell>
                      {new Date(postulante.fecha_postulacion).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleVerCV(postulante.egresado_id, postulante)}
                      >
                        Ver CV Digital
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No hay postulantes para esta oferta.</Typography>
          )}
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseModal}
            sx={{ mt: 2 }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>

      {/* Modal para mostrar el CV Digital */}
      {cvData && (
        <Modal open={Boolean(cvData)} onClose={() => setCvData(null)}>
          <Box sx={modalStyle(theme)}>
            <Typography variant="h5" gutterBottom>
              CV Digital
            </Typography>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Información Personal
                </Typography>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Typography variant="body1" color="textprimary">
                    <strong><Email sx={{ marginRight: 1 }} /> Nombre:</strong> {cvData.informacionPersonal.nombre}
                    </Typography>
                    <Typography variant="body1" color="textprimary">
                    <strong><Email sx={{ marginRight: 1 }} /> Email:</strong> {cvData.informacionPersonal.email}
                    </Typography>
                    <Typography variant="body1" color="textprimary">
                    <strong><Phone sx={{ marginRight: 1 }} /> Teléfono:</strong> {cvData.informacionPersonal.telefono}
                    </Typography>
                    <Typography variant="body1" color="textprimary">
                    <strong><School sx={{ marginRight: 1 }} /> Carrera:</strong> {cvData.informacionPersonal.carrera}
                    </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Experiencias Laborales
                </Typography>
                {cvData.experienciasLaborales.length > 0 ? (
                    cvData.experienciasLaborales.map((exp, index) => {
                    const periodo = calcularDiferencia(exp.fecha_inicio, exp.fecha_fin);

                    return (
                        <Card key={index} sx={{ marginBottom: 2 }}>
                        <CardHeader
                            avatar={<Work />}
                            title={exp.puesto}
                            subheader={exp.empresa}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textPrimary" paragraph>
                            <strong><Business sx={{ marginRight: 1 }} /> Empresa:</strong> {exp.empresa}
                            </Typography>
                            <Typography variant="body2" color="textPrimary" paragraph>
                            <strong><CalendarToday sx={{ marginRight: 1 }} /> Período:</strong> {periodo}
                            </Typography>
                            <Divider sx={{ marginY: 1 }} />
                            <Typography variant="body2" color="textPrimary">
                            <strong>Descripción:</strong> {exp.descripcion}
                            </Typography>
                        </CardContent>
                        </Card>
                    );
                    })
                ) : (
                    <Typography>No hay experiencias laborales registradas.</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Formación Académica
                </Typography>
                {cvData.formacionAcademica.length > 0 ? (
                    cvData.formacionAcademica.map((form, index) => {
                    const periodo = calcularDiferencia(form.fecha_inicio, form.fecha_fin);

                    return (
                        <Card key={index} sx={{ marginBottom: 2 }}>
                        <CardHeader
                            avatar={<School />}
                            title={form.titulo}
                            subheader={form.institucion}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textprimary" paragraph>
                            <strong><Business sx={{ marginRight: 1 }} /> Institución:</strong> {form.institucion}
                            </Typography>
                            <Typography variant="body2" color="textprimary" paragraph>
                            <strong><CalendarToday sx={{ marginRight: 1 }} /> Período:</strong> {periodo}
                            </Typography>
                            <Divider sx={{ marginY: 1 }} />
                            <Typography variant="body2" color="textprimary">
                            <strong>Descripción:</strong> {form.descripcion}
                            </Typography>
                        </CardContent>
                        </Card>
                    );
                    })
                ) : (
                    <Typography>No hay formación académica registrada.</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {/* Sección de Habilidades */}
                <Typography variant="h6" gutterBottom>
                    Habilidades
                </Typography>
                {cvData.habilidades.length > 0 ? (
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    {cvData.habilidades.map((habilidad, index) => {
                        const nivelColorMap = {
                        básico: "warning",
                        intermedio: "info",
                        avanzado: "success",
                        };
                        const color = nivelColorMap[habilidad.nivel.toLowerCase()] || "default";

                        return (
                        <Box
                            key={index}
                            sx={{
                            flex: "0 0 25%", // 4 elementos por fila (100% / 4 = 25%)
                            padding: "8px", // Espaciado entre elementos
                            boxSizing: "border-box",
                            }}
                        >
                            <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                            <CheckCircleOutline color="primary" sx={{ mr: 1 }} />
                            {`${habilidad.habilidad} : `}
                            <Chip
                                label={habilidad.nivel.charAt(0).toUpperCase() + habilidad.nivel.slice(1)}
                                color={color}
                                size="small"
                                sx={{ ml: 1 }}
                            />
                            </Typography>
                        </Box>
                        );
                    })}
                    </Box>
                ) : (
                    <Typography color="textSecondary">No hay habilidades registradas.</Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                {/* Sección de Idiomas */}
                <Typography variant="h6" gutterBottom>
                    Idiomas
                </Typography>
                {cvData.idiomas.length > 0 ? (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    {cvData.idiomas.map((idioma, index) => {
                        // Colores según el nivel
                        const nivelColorMap = {
                        básico: "warning",
                        intermedio: "info",
                        avanzado: "success",
                        };
                        const color = nivelColorMap[idioma.nivel.toLowerCase()] || "default";

                        return (
                        <Box
                            key={index}
                            sx={{
                            flex: "0 0 25%", // 4 elementos por fila (100% / 4 = 25%)
                            padding: "8px", // Espaciado entre elementos
                            boxSizing: "border-box",
                            }}
                        >
                            <Typography variant="body1" sx={{ display: "flex", alignItems: "center" }}>
                            <Language color="secondary" sx={{ mr: 1 }} />
                            {`${idioma.idioma} : `}
                            <Chip
                                label={idioma.nivel.charAt(0).toUpperCase() + idioma.nivel.slice(1)}
                                color={color}
                                size="small"
                                sx={{ ml: 1 }}
                            />
                            </Typography>
                        </Box>
                        );
                    })}
                    </Box>
                ) : (
                    <Typography color="textSecondary">No hay idiomas registrados.</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                {/* Sección de Logros */}
                <Typography variant="h6" gutterBottom>
                    Logros
                </Typography>

                {cvData.logros.length > 0 ? (
                    <Card elevation={3} sx={{ marginBottom: 2 }}>
                    <CardContent>
                        <List>
                        {cvData.logros.map((logro, index) => (
                            <React.Fragment key={index}>
                            <ListItem>
                                <ListItemIcon>
                                <Star color="primary" />
                                </ListItemIcon>
                                <ListItemText primary={logro.descripcion} />
                            </ListItem>
                            {index < cvData.logros.length - 1 && <Divider />} {/* Separador entre logros */}
                            </React.Fragment>
                        ))}
                        </List>
                    </CardContent>
                    </Card>
                ) : (
                    <Typography color="text.secondary">No hay logros registrados.</Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                    <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setCvData(null)}
                    sx={{ paddingX: 4, paddingY: 1 }}
                    >
                    Cerrar
                    </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </React.Fragment>
  );
}

const modalStyle = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: theme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "80%",
  maxHeight: "80vh",
  overflowY: "auto",
});
