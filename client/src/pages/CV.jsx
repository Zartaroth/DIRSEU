import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Button,
  Typography,
  Box,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import { AddCircle, Work, School, Star, Language, EmojiEvents, Delete } from "@mui/icons-material";
import { useAuth } from "../context/AuthProvider.jsx";
import {
  createExperienciaLaboralRequest, getExperienciasByEgresadoRequest, deleteExperienciaLaboralRequest,
  createFormacionAcademicaRequest, getFormacionesByEgresadoRequest, deleteFormacionAcademicaRequest,
  createHabilidadRequest, getHabilidadesByEgresadoRequest, deleteHabilidadRequest,
  createIdiomaRequest, getIdiomasByEgresadoRequest, deleteIdiomaRequest,
  createLogroRequest, getLogrosByEgresadoRequest, deleteLogroRequest,
} from "../api/CV.js";

const forms = [
  {
    label: "Experiencias laborales",
    icon: <Work />,
    fetchRequest: getExperienciasByEgresadoRequest,
    saveRequest: createExperienciaLaboralRequest,
    deleteRequest: deleteExperienciaLaboralRequest,
    displayField: "descripcion",
    fields: [
      { name: "empresa", label: "Empresa", type: "text" },
      { name: "puesto", label: "Puesto", type: "text" },
      { name: "descripcion", label: "Descripción", type: "text" },
      { name: "fecha_inicio", label: "Fecha de inicio", type: "date" },
      { name: "fecha_fin", label: "Fecha de fin", type: "date" },
    ],
  },
  {
    label: "Formación académica",
    icon: <School />,
    fetchRequest: getFormacionesByEgresadoRequest,
    saveRequest: createFormacionAcademicaRequest,
    deleteRequest: deleteFormacionAcademicaRequest,
    displayField: "titulo",
    fields: [
      { name: "institucion", label: "Institución", type: "text" },
      { name: "titulo", label: "Título", type: "text" },
      { name: "descripcion", label: "Descripción", type: "text" },
      { name: "fecha_inicio", label: "Fecha de inicio", type: "date" },
      { name: "fecha_fin", label: "Fecha de fin", type: "date" },
    ],
  },
  {
    label: "Habilidades",
    icon: <Star />,
    fetchRequest: getHabilidadesByEgresadoRequest,
    saveRequest: createHabilidadRequest,
    deleteRequest: deleteHabilidadRequest,
    displayField: "habilidad",
    fields: [
      { name: "habilidad", label: "Habilidad", type: "text" },
      {
        name: "nivel",
        label: "Nivel",
        type: "select",
        options: [
          { value: "básico", label: "Básico" },
          { value: "intermedio", label: "Intermedio" },
          { value: "avanzado", label: "Avanzado" },
        ],
      },
    ],
  },
  {
    label: "Idiomas",
    icon: <Language />,
    fetchRequest: getIdiomasByEgresadoRequest,
    saveRequest: createIdiomaRequest,
    deleteRequest: deleteIdiomaRequest,
    displayField: "idioma",
    fields: [
      { name: "idioma", label: "Idioma", type: "text" },
      {
        name: "nivel",
        label: "Nivel",
        type: "select",
        options: [
          { value: "básico", label: "Básico" },
          { value: "intermedio", label: "Intermedio" },
          { value: "avanzado", label: "Avanzado" },
        ],
      },
    ],
  },
  {
    label: "Logros",
    icon: <EmojiEvents />,
    fetchRequest: getLogrosByEgresadoRequest,
    saveRequest: createLogroRequest,
    deleteRequest: deleteLogroRequest,
    displayField: "logro",
    fields: [
      { name: "logro", label: "Logro", type: "text" },
      { name: "descripcion", label: "Descripción", type: "text" },
      { name: "fecha", label: "Fecha", type: "date" },
    ],
  },
];

export default function CV() {
    const [activeStep, setActiveStep] = useState(0);
    const { register, handleSubmit, reset, control } = useForm();
    const { getUser } = useAuth();
    const idEgresado = getUser()?.id;
  
    const { fields } = useFieldArray({
      control,
      name: `form_${activeStep}`,
    });
  
    const [formData, setFormData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await forms[activeStep].fetchRequest(idEgresado);
          setFormData(data.length > 0 ? data : []);
        } catch (error) {
          console.error("Error al obtener los datos:", error);
          setFormData([]);
        }
      };
  
      if (idEgresado) fetchData();
    }, [activeStep, idEgresado]);
  
    const handleAddEntry = async (data) => {
      try {
        const newEntry = forms[activeStep].fields.reduce((acc, field) => {
          acc[field.name] = data[`form_${activeStep}[0].${field.name}`];
          return acc;
        }, {});
  
        await forms[activeStep].saveRequest({ ...newEntry, id_egresado: idEgresado });
  
        setFormData((prev) => [...prev, newEntry]);
        reset();
        alert("Registro agregado con éxito.");
      } catch (error) {
        console.error("Error al agregar el registro:", error);
      }
    };
  
    const handleDeleteEntry = async (id) => {
      try {
        const entryToDelete = formData.find((item) => item.id === id);
  
        if (!entryToDelete || !entryToDelete.id) {
          console.error("No se encontró un registro válido para eliminar.");
          return; // Evita que se ejecute si no hay un registro válido
        }
  
        await forms[activeStep].deleteRequest(entryToDelete);
        setFormData((prev) => prev.filter((item) => item.id !== id));
        alert("Registro eliminado con éxito.");
      } catch (error) {
        console.error("Error al eliminar el registro:", error);
      }
    };

  const renderFormContent = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Agregar Registro
        </Typography>
        {forms[activeStep].fields.map((field, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            {field.type === "select" ? (
              <TextField
                select
                label={field.label}
                {...register(`form_${activeStep}[0].${field.name}`)}
                fullWidth
                SelectProps={{ native: true }}
              >
                <option value=""></option>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            ) : (
              <TextField
                label={field.label}
                type={field.type}
                {...register(`form_${activeStep}[0].${field.name}`)}
                fullWidth
              />
            )}
          </Box>
        ))}
        <Button
          variant="outlined"
          startIcon={<AddCircle />}
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit(handleAddEntry)}
        >
          Agregar
        </Button>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
            Datos cargados
            </Typography>
            {formData.length === 0 ? (
            <Typography variant="body1">Sin registros aún</Typography>
            ) : (
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Detalle</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formData.map((data) => (
                        <TableRow key={data.id}> {/* Usar data.id en lugar de index */}
                        <TableCell>{data[forms[activeStep].displayField] || "Sin datos"}</TableCell>
                        <TableCell align="right">
                            {/* Botón de eliminación */}
                            <IconButton
                            color="secondary"
                            onClick={() => handleDeleteEntry(data.id)}
                            >
                            <Delete />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )}
        </Box>
        </Grid>
    </Grid>
  );

  return (
    <Box sx={{ width: "90%", margin: "auto", mt: 15 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Formulario por Categorías
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          mb: 3,
          gap: 2,
        }}
      >
        {forms.map((form, index) => (
          <Button
            key={index}
            startIcon={form.icon}
            variant={index === activeStep ? "contained" : "outlined"}
            onClick={() => setActiveStep(index)}
            sx={{
              minWidth: 120,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {form.label}
          </Button>
        ))}
      </Box>

      {renderFormContent()}
    </Box>
  );
}
