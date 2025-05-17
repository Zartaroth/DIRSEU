import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Grid, TextField, MenuItem, Select, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useAuth } from '../context/AuthProvider';
import { createBachilleratoRequest, getAllBachilleratosRequest, getBachilleratosByEgresadoRequest, updateBachilleratoRequest } from '../api/bachillerato';
import { createTituloProfesionalRequest, getAllTitulosRequest, getTitulosByEgresadoRequest, updateTituloProfesionalRequest } from '../api/tituloProfesional';
import { createEmpleoActualRequest, getEmpleoByEgresadoRequest, getEmpleoByIdRequest, updateEmpleoActualRequest } from '../api/trabajoActual';

const tipos = ["Internado", "Ejercicio Pre Profesional"];

const SegEg = () => {
    const auth = useAuth();
    const user = auth.getUser();

    if (!user) return null;

    const idEgresado = user.id;

    const [bachilleratoActual, setBachilleratoActual] = useState(null);
    const [bachilleratoData, setBachilleratoData] = useState({
        id_egresado: idEgresado,
        tipo: "",
        fecha_inicio: "",
        fecha_fin: "",
        fecha_obtencion: "",
        nro_resolucion: ""
    });

    const [tituloActual, setTituloActual] = useState(null);
    const [tituloData, setTituloData] = useState({
        id_egresado: idEgresado,
        titulo: "",
        fecha_sustentacion: "",
        modalidad_obtencion: "",
        fecha_obtencion: "",
        nro_resolucion: ""
    });

    const [empleoActual, setEmpleoActual] = useState(null);
    const [empleoData, setEmpleoData] = useState({
        id_egresado: idEgresado,
        cargo_laboral: "",
        institucion: "",
        area: "",
        grado_universitario: "",
        fecha_inicio: ""
    });
    const [modalBachiOpen, setBachiModalOpen] = useState(false);
    const [modalTituloOpen, setTituloModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const fetchEmpleoActual = async () => {
            try {
                const response = await getEmpleoByEgresadoRequest(idEgresado);

                if (response && Array.isArray(response) && response.length > 0) {
                    setEmpleoActual(response[0]); // Asignar correctamente si es un array
                    setEmpleoData({ ...response[0] }); // Copiar los datos
                }
            } catch (error) {
                console.error("Error al obtener empleo actual", error);
            }
        };
        fetchEmpleoActual();
        const fetchBachilleratoActual = async () => {
            try {
                const response = await getBachilleratosByEgresadoRequest(idEgresado);

                if (response && Array.isArray(response) && response.length > 0) {
                    setBachilleratoActual(response[0]); // Asignar correctamente si es un array
                    setBachilleratoData({ ...response[0] }); // Copiar los datos
                }
            } catch (error) {
                console.error("Error al obtener bachillerato actual", error);
            }
        };
        fetchBachilleratoActual();
        const fetchTituloActual = async () => {
            try {
                const response = await getTitulosByEgresadoRequest(idEgresado);

                if (response && Array.isArray(response) && response.length > 0) {
                    setTituloActual(response[0]); // Asignar correctamente si es un array
                    setTituloData({ ...response[0] }); // Copiar los datos
                }
            } catch (error) {
                console.error("Error al obtener titulo actual", error);
            }
        };
        fetchTituloActual();
    }, [idEgresado]);

    const handleChange = (e) => {
        setEmpleoData({ ...empleoData, [e.target.name]: e.target.value });
    };
    
    const handleBachilleratoChange = (e) => {
        setBachilleratoData({ ...bachilleratoData, [e.target.name]: e.target.value });
    };
    
    const handleTituloChange = (e) => {
        setTituloData({ ...tituloData, [e.target.name]: e.target.value });
    };

    const handleSaveEmpleo = async () => {
        try {
            console.log("📤 Datos enviados:", empleoData);
            if (empleoActual && empleoActual.id) {
                await updateEmpleoActualRequest(empleoActual.id, empleoData);
                alert("Empleo actualizado correctamente");
            } else {
                const nuevoEmpleo = await createEmpleoActualRequest(empleoData);
                alert("Empleo registrado correctamente");
                setEmpleoActual(nuevoEmpleo); // Guardar el nuevo empleo con ID
            }
            setModalOpen(false);
        } catch (error) {
            console.error("Error al guardar empleo", error);
        }
    };

    const handleSaveBachillerato = async () => {
        try {
            console.log("📤 Datos enviados:", bachilleratoData);
            if (bachilleratoData && bachilleratoData.id) {
                await updateBachilleratoRequest(bachilleratoData.id, bachilleratoData);
                alert("bachillerato actualizado correctamente");
            } else {
                const nuevoBachillerato = await createBachilleratoRequest(bachilleratoData);
                alert("Bachillerato registrado correctamente");
                setEmpleoActual(nuevoBachillerato); // Guardar el nuevo empleo con ID
            }
            setModalOpen(false);
        } catch (error) {
            console.error("Error al guardar bachillerato", error);
        }
    };

    const handleSaveTitulo = async () => {
        try {
            console.log("📤 Datos enviados:", tituloData);
            if (tituloData && tituloData.id) {
                await updateTituloProfesionalRequest(tituloData.id, tituloData);
                alert("Titulo actualizado correctamente");
            } else {
                const nuevoTitulo = await createTituloProfesionalRequest(tituloData);
                alert("Titulo registrado correctamente");
                setTituloActual(nuevoTitulo);
            }
            setModalOpen(false);
        } catch (error) {
            console.error("Error al guardar titulo", error);
        }
    };

    return (
        <Box p={10}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>Actualización de Datos</Typography>

            {/* DATOS PERSONALES */}
            <Paper elevation={4} sx={{ p: 5, mb: 5 }}>
                <Typography variant="h6" sx={{ mb: 3 }} gutterBottom>Datos Personales</Typography>
                <Grid container spacing={3}>
                    {[
                        { label: "Nombre", value: user.firstName },
                        { label: "Apellidos", value: user.lastName },
                        { label: "Código", value: user.codigo },
                        { label: "Email", value: user.email },
                        { label: "Teléfono", value: user.telefono },
                        { label: "Dirección", value: user.direccion },
                        { label: "Carrera", value: user.carrera },
                        { label: "Promoción", value: user.promocion }
                    ].map((item, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <TextField fullWidth label={item.label} value={item.value || ""} disabled />
                        </Grid>
                    ))}
                </Grid>
            </Paper>

            {/* BACHILLERATO */}
            <Paper elevation={3} sx={{ p: 5, mb: 5 }}>
                <Typography variant="h6" sx={{ mb: 3 }} gutterBottom>Bachillerato</Typography>
                {bachilleratoActual ? (
                    <>
                        <Typography variant="body1" color="primary">Ya tienes un bachillerato registrado.</Typography>
                        <Button variant="contained" color="secondary" onClick={() => setBachiModalOpen(true)}>Actualizar</Button>
                    </>
                ) : (
                    <Button variant="contained" color="primary" onClick={() => setBachiModalOpen(true)}>Registrar Bachillerato</Button>
                )}
            </Paper>

            {/* Modal para registrar/actualizar bachillerato */}
            <Dialog open={modalBachiOpen} onClose={() => setBachiModalOpen(false)}>
                <DialogTitle>{bachilleratoActual ? "Actualizar Bachillerato" : "Registrar Bachillerato"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        {[
                            { name: "tipo", label: "Tipo" },
                            { name: "fecha_inicio", label: "Fecha de Inicio", type: "date" },
                            { name: "fecha_fin", label: "Fecha de Fin", type: "date" },
                            { name: "fecha_obtencion", label: "Fecha de Obtención", type: "date" },
                            { name: "nro_resolucion", label: "N° Resolución" }
                        ].map((field, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <TextField
                                    fullWidth
                                    type={field.type || "text"}
                                    label={field.label}
                                    name={field.name}
                                    value={bachilleratoData[field.name] || ""}
                                    onChange={handleBachilleratoChange}
                                    InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setBachiModalOpen(false)}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSaveBachillerato}>
                        {bachilleratoActual ? "Actualizar" : "Guardar"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* TÍTULO PROFESIONAL */}
            <Paper elevation={3} sx={{ p: 5, mb: 5 }}>
                <Typography variant="h6" sx={{ mb: 3 }} gutterBottom>Título Profesional</Typography>
                {tituloActual ? (
                    <>
                        <Typography variant="body1" color="primary">Ya tienes un título registrado.</Typography>
                        <Button variant="contained" color="secondary" onClick={() => setTituloModalOpen(true)}>Actualizar</Button>
                    </>
                ) : (
                    <Button variant="contained" color="primary" onClick={() => setTituloModalOpen(true)}>Registrar Título</Button>
                )}
            </Paper>

            {/* Modal para registrar/actualizar título */}
            <Dialog open={modalTituloOpen} onClose={() => setTituloModalOpen(false)}>
                <DialogTitle>{tituloActual ? "Actualizar Título" : "Registrar Título"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        {[
                            { name: "titulo", label: "Título" },
                            { name: "fecha_sustentacion", label: "Fecha de Sustentación", type: "date" },
                            { name: "modalidad_obtencion", label: "Modalidad de Obtención" },
                            { name: "fecha_obtencion", label: "Fecha de Obtención", type: "date" },
                            { name: "nro_resolucion", label: "N° Resolución" }
                        ].map((field, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <TextField
                                    fullWidth
                                    type={field.type || "text"}
                                    label={field.label}
                                    name={field.name}
                                    value={tituloData[field.name] || ""}
                                    onChange={handleTituloChange}
                                    InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setTituloModalOpen(false)}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSaveTitulo}>
                        {tituloActual ? "Actualizar" : "Guardar"}
                    </Button>
                </DialogActions>
            </Dialog>
            {/* SITUACIÓN LABORAL ACTUAL */}
            <Paper elevation={3} sx={{ p: 5, mb: 5 }}>
                <Typography variant="h6" sx={{ mb: 3 }} gutterBottom>Situación Laboral Actual</Typography>
                {empleoActual ? (
                    <>
                        <Typography variant="body1" color="primary">Ya tienes un empleo registrado.</Typography>
                        <Button variant="contained" color="secondary" onClick={() => setModalOpen(true)}>Actualizar</Button>
                    </>
                ) : (
                    <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>Registrar Empleo</Button>
                )}
            </Paper>
            
            {/* Modal para registrar/actualizar empleo */}
            <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
                <DialogTitle>{empleoActual ? "Actualizar Empleo" : "Registrar Empleo"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        {[{ name: "cargo_laboral", label: "Cargo Laboral" },
                          { name: "institucion", label: "Institución" },
                          { name: "area", label: "Área" },
                          { name: "fecha_inicio", label: "Fecha de Inicio", type: "date" },
                          { name: "grado_universitario", label: "Grado Universitario" }]
                        .map((field, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <TextField
                                    fullWidth
                                    type={field.type || "text"}
                                    label={field.label}
                                    name={field.name}
                                    value={empleoData[field.name] || ""}
                                    onChange={handleChange}
                                    InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
                    <Button variant="contained" color="primary" onClick={handleSaveEmpleo}>{empleoActual ? "Actualizar" : "Guardar"}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SegEg;
