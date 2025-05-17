import { useState } from 'react';
import { Download } from 'lucide-react';
import { useTheme, Typography, Box, Button } from '@mui/material';

export default function DocumentosInteres() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme(); // Usamos el tema de Material UI para detectar el modo claro/oscuro

  const data = {
    Gestión: [
      { title: "Declaratoria de la Política ambiental UAC", link: "" },
      { title: "Plan de Gestion Ambiental", link: "" },
      { title: "Plan de Ecoeficiencia", link: "" },
      { title: "Plan de Manejo de RRSS", link: "" },
    ],
    Comision: [
      { title: "Responsabilidad Social conformación de la CAU", link: "" },
      { title: "Comisión Ambiental Universitaria", link: "" },
    ],
    Reportes: [
      { title: "Reporte de Sostenibilidad Ambiental 2021", link: "" },
      { title: "Reporte de Sostenibilidad Ambiental 2022", link: "" },
      { title: "Reporte de Sostenibilidad Ambiental 2023", link: "" },
      { title: "Reporte de Sostenibilidad Ambiental 2024", link: "" },
    ],
  }

  const renderList = (items) => (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {items.map((item, index) => (
        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${theme.palette.divider}` }}>
          <span style={{ color: theme.palette.text.primary }}>{item.title}</span>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: theme.palette.action.hover,
              color: theme.palette.text.secondary,
              padding: '8px 12px',
              borderRadius: '4px',
              textDecoration: 'none',
            }}
          >
            <Download style={{ marginRight: '8px' }} />
            <span>Descargar</span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <Box
      sx={{
        maxWidth: '100%',
        mx: 'auto',
        p: 6,
        bgcolor: theme.palette.background.paper,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 6, color: theme.palette.text.primary }}>
        Documentos de Interes
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: theme.palette.divider, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
          <Button
            onClick={() => setActiveTab(0)}
            sx={{
              pb: 2,
              borderBottom: activeTab === 0 ? `2px solid ${theme.palette.primary.main}` : 'none',
              color: activeTab === 0 ? theme.palette.primary.main : theme.palette.text.secondary,
            }}
          >
            Gestión Ambiental UAC
          </Button>
          <Button
            onClick={() => setActiveTab(1)}
            sx={{
              pb: 2,
              borderBottom: activeTab === 1 ? `2px solid ${theme.palette.primary.main}` : 'none',
              color: activeTab === 1 ? theme.palette.primary.main : theme.palette.text.secondary,
            }}
          >
            Comisión Ambiental
          </Button>
          <Button
            onClick={() => setActiveTab(2)}
            sx={{
              pb: 2,
              borderBottom: activeTab === 2 ? `2px solid ${theme.palette.primary.main}` : 'none',
              color: activeTab === 2 ? theme.palette.primary.main : theme.palette.text.secondary,
            }}
          >
            Reporte de Sostenibilidad Ambiental
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        {activeTab === 0 && (
          <>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>Gestión Ambiental UAC</Typography>
            {renderList(data.Gestión)}
          </>
        )}

        {activeTab === 1 && (
          <>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>Comision Ambiental</Typography>
            {renderList(data.Comision)}
          </>
        )}

        {activeTab === 2 && (
          <>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>Reportes</Typography>
            {renderList(data.Reportes)}
          </>
        )}
      </Box>
    </Box>
  );
}
