import React, { useEffect, useState } from "react";
import { Grid, Card, Typography, Button, Modal, Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import * as XLSX from "xlsx";
import { getTableRequest, getEgresadosInscriptionRequest } from "../../api/api";
import { useTheme } from '@mui/material/styles';

export default function VerInscritosCapacitaciones() {
  const [items, setItems] = useState([]); // Lista de capacitaciones
  const [open, setOpen] = useState(false); // Estado del modal
  const [inscritos, setInscritos] = useState([]); // Lista de inscritos
  const [selectedCapacitacion, setSelectedCapacitacion] = useState(null); // Capacitacion seleccionada
  const theme = useTheme(); // Usar el tema para ajustar el modal según el modo oscuro/claro

  useEffect(() => {
    getItems();
  }, []);

  async function getItems() {
    try {
      const response = await getTableRequest({ table: "capacitaciones" });
      if (response.ok) {
        const json = await response.json();
        setItems(json.rows);
      } else {
        console.error("Error al cargar las capacitaciones");
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Función para abrir el modal y cargar los inscritos
  const handleOpenModal = async (capacitacionId) => {
    try {
      const response = await getEgresadosInscriptionRequest({
        table: "capacitaciones",
        id: capacitacionId,
      });

      if (response.ok) {
        const json = await response.json();
        const rowsWithIds = json.rows.map((row, index) => ({
          id: index,
          ...row,
        }));
        setInscritos(rowsWithIds);
        setSelectedCapacitacion(capacitacionId); // Guarda la capacitacion seleccionada
        setOpen(true); // Abre el modal
      } else {
        console.error("Error al cargar los inscritos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setInscritos([]);
  };

  // Función para descargar la tabla como archivo Excel
  async function handleDownload(e) {
    e.preventDefault();

    try {
      const response = await getEgresadosInscriptionRequest({
        table: "capacitaciones",
        id: selectedCapacitacion,
      });

      if (response.ok) {
        const json = await response.json();
        const ws = XLSX.utils.json_to_sheet(json.rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Inscritos");
        XLSX.writeFile(wb, "inscritos_capacitacion.xlsx");
      }
    } catch (error) {
      console.error("Error al descargar el archivo Excel");
    }
  }

  const columns = [
    { field: "Nombre", headerName: "Nombre del Egresante", width: 180 },
    { field: "Codigo", headerName: "Código", width: 80 },
    { field: "Carrera", headerName: "Carrera", width: 120 },
    { field: "Promocion", headerName: "Promo", width: 60 },
    { field: "Telefono", headerName: "Teléfono", width: 100 },
    { field: "Direccion", headerName: "Dirección", width: 80 },
    { field: "Fecha_Inscripcion", headerName: "Fecha Inscripción", width: 120 },
  ];

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {items.map((item) => (
          <Grid key={item.id} item xs={12}>
            <Card
              variant="outlined"
              sx={{ p: 2, display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6">{item.nombre}</Typography>
              <Button variant="contained" color="primary" onClick={() => handleOpenModal(item.id)}>
                Ver Inscritos
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para mostrar los inscritos */}
      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={{ ...modalStyle(theme) }}>
          <Typography variant="h6" mb={2}>
            Inscritos para la Capacitación {selectedCapacitacion}
          </Typography>
          <DataGrid
            autoHeight
            rows={inscritos}
            columns={columns}
            pageSize={5}
            disableColumnResize
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={handleCloseModal} variant="outlined">
              Cerrar
            </Button>
            <IconButton
              aria-label="Descargar Excel"
              onClick={handleDownload}
              color="primary"
            >
              <SystemUpdateAltIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

// Estilos para el modal, adaptados a tema claro/oscuro
const modalStyle = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "900px",
  bgcolor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
});
