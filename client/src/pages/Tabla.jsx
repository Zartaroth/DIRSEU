import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton, Paper } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUsersInscriptionRequest } from "../api/api";

import * as XLSX from "xlsx";

export default function Tabla() {
  const { table, id } = useParams();
  const [rows, setRows] = useState([]);

  const navigate = useNavigate(); // Obtiene el objeto history

  useEffect(() => {
    geItems();
  }, []);

  async function geItems() {
    try {
      const response = await getUsersInscriptionRequest({ table, id });

      if (response.ok) {
        console.log("Tabla Recuperada");

        const json = await response.json();
        const rowsWithIds = json.rows.map((row, index) => ({
          id: index,
          ...row,
        }));
        setRows(rowsWithIds);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  const getRowClassName = (params) => {
    const estado = params.row.estado ? params.row.estado.toLowerCase() : ""; // Verificar si estado está definido
    const estadoClass =
      estado === "aprobado"
        ? "estado-aprobado"
        : estado === "pendiente"
        ? "estado-pendiente"
        : "estado-rechazado";

    const evenOddClass =
      params.indexRelativeToCurrentPage % 3 === 0 ? "even" : "odd";

    return `${evenOddClass} ${estadoClass}`;
  };

  async function handleDownload(e) {
    e.preventDefault();

    try {
      const response = await getUsersInscriptionRequest({ table, id });

      if (response.ok) {
        console.log("Tabla Recuperada par Descargar");

        const json = await response.json();

        // Convertir datos a formato de hoja de cálculo
        const ws = XLSX.utils.json_to_sheet(json.rows);

        // Crear un libro de trabajo
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Guardar el libro de trabajo como archivo Excel
        XLSX.writeFile(wb, "data.xlsx");
      }
    } catch (error) {}
  }

  return (
    <>
      <Box
        component={Paper}
        elevation={10}
        sx={{
          width: "100%",
          mxl: "auto",
          display: "flex",
          flexDirection: "column",

          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <Button
            startIcon={<ChevronLeftRoundedIcon />}
            onClick={handleBack} // Llamar a la función handleBack al hacer clic
            variant="text"
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            Regresar
          </Button>

          <Button
            startIcon={<ChevronLeftRoundedIcon />}
            onClick={handleBack} // Llamar a la función handleBack al hacer clic
            variant="outlined"
            fullWidth
            sx={{
              display: { xs: "flex", sm: "none" },
            }}
          />
        </Box>
        <DataGrid
          autoHeight
          checkboxSelection
          rows={rows}
          columns={columns}
          getRowClassName={getRowClassName}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableColumnResize
          sx={{ backgroundColor: "white", color: "black", m: 5, mt: 2 }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mr: 2,
            mb: 2,
          }}
        >
          <IconButton
            aria-label="Descargar"
            onClick={handleDownload}
            color="primary"
          >
            <SystemUpdateAltIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

const columns = [
  { field: "Nombre", headerName: "Nombre Estudiante", width: 180 },
  { field: "Codigo", headerName: "Codigo", width: 110 },
  { field: "Carrera", headerName: "Carrera", width: 120 },
  { field: "Semestre", headerName: "Semestre", width: 80 },
  { field: "Fecha_Inscripcion", headerName: "Fecha Inscripcion", width: 120 },
  {
    field: "Estado",
    headerName: "Estado Solicitud",
    width: 120,
    renderCell: (params) => {
      const estado = params.row.estado ? params.row.estado.toLowerCase() : "";
      const color =
        estado === "aprobado"
          ? "green"
          : estado === "pendiente"
          ? "yellow"
          : "red";

      const estilo = {
        backgroundColor: color,
        padding: "3px 10px",
        borderRadius: "4px",
        color: "white",
      };

      return <span style={estilo}>{params.value}</span>;
    },
  },
];
