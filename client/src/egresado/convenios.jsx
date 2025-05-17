import React, { useState } from 'react';
import { useTheme, Typography, Box, Button } from '@mui/material';

const convenios = {
  internacionales: [
    'Universidad Miguel Hernández de Elche (España-Alicante)',
    'Universidad Santo Tomas de Bucaramanga (Colombia)',
    'Mount Saint Mary’s University (Usa) y Willqui S.R.L. (Perú)',
    'Universidad Federal de Minas Gerais (Brasil)',
    'Universidad de Valladolid (España)',
    'Universidade Estadual de Campinas (Brasil)',
    'Universidad Autónoma de Asunción (Paraguay)',
    'Thompson Rivers University British Columbia (Canadá)',
    'Universidad de Colima (México)',
    'Universidad de Sevilla (España)',
    'Universidad Nacional de Jeju (Corea)',
    'Universidad Nacional de Jujuy (Argentina)',
    'Universidad de Tarapacá (Chile)',
    'Universidad Técnica de Ambato (Ecuador)',
    'Municipalidad Provincial del Cusco y Universidad Gabrielle D\'annunzio de Chieti pescara (Italia)',
    'Instituto Tecnológico Superior de Zacapoaxtla (Puebla-México)',
    'Universidad de Mendel in Brno (Republica Checa)',
    'Universidad de Aquino - UDABOL (Bolivia)',
    'Universidad Tecnológica Privada de Santa Cruz Sociedad Anónima - UTEPSA (Bolivia)',
    'ERASMUS +  - UVA',
    'Universidad Pedagógica Nacional (Colombia)',
    'Universidad de la Frontera de Temuco (Chile)',
    'Universidad Santo Tomas Seccional de Tunja (Colombia)',
    'Universidad de Valladolid (España)',
    'Universidad Católica de Salta (Argentina)',
    'Universidad de Catamarca (Argentina)',
    'Universidad Nacional de Rio Cuarto (Argentina)',
    'Universidad Simon Bolivar de Barranquilla (Colombia)',
    'Fundación Alcalá',
    'Universidad de Ciencias Aplicadas y Ambientales (Colombia)',
    'Universidad de las Illes Balears (España)',
    'Universidad de Huelva (España)',
    'Universidad Nacional Autónoma (México)',
    'Universidad Santiago de Compostela (España)'
  ],
  nacionales: [
    'La Pontificia Universidad Catolica del Perú',
    'Universidad Nacional de Ingeniería (UNI)',
    'Centro de Futuros Alternativos',
    'Centro Nacional de Estimación, Prevención y Reducción del Riesgo de Desastres - CENEPRED',
    'Universidad Ricardo Palma',
    'Universidad de San Martin de Porres',
    'Universidad Nacional Agraria la Molina',
    'Universidad Jaime Bausate y Meza',
    'Ministerio de Vivienda, Construcción y Saneamiento',
    'Servicio Nacional de Áreas Naturales Protegidas por el Estado',
    'The Ankawa Global Group S.A.C.',
    'Libun',
    'IBM del Perú S.A.C.'
  ],
  regionales: [
    'Gerencia Regional de Educación Cusco',
    'Colegio de Arquitectos del Perú – Regional Cusco',
    'Dirección Desconcentrada de Cultura Cusco del Ministerio de Cultura',
    'Municipalidad Distrital de Yanatile'
  ],
  locales: [
    'La Sociedad de Beneficencia del Cusco',
    'Centro de Interpretación Cultural y Protección Natural',
    'Asociación Ayuda para Vida Silvestre Amenazada Sociedad Zoologica de Francfort (Perú)',
    'Municipalidad Distrital de Lucre',
    'Municipalidad Distrital de San Sebastian',
    'Municipalidad Provincial de Anta',
    'Centro de Estudios Regionales Andinos Bartolomé de las Casas',
    'Municipalidad Distrital de Wanchaq',
    'Caritas Arquidioscesana Cusco',
    'Centro de Educación y Comunicación Guaman Poma de Ayala',
    'Electro Sur Este S.A.A.',
    'CREES Foundation',
    'Municipalidad Provincial del Cusco'
  ]
};

// Función para renderizar la lista de convenios
const renderList = (items) => (
  <ul style={{ paddingLeft: '20px', marginBottom: '20px', lineHeight: '1.6' }}>
    {items.map((item, index) => (
      <li key={index} style={{ marginBottom: '8px', fontSize: '16px', listStyleType: 'none', position: 'relative' }}>
        <span style={{
          position: 'absolute',
          left: '-20px',
          color: '#007BFF',  // Color bonito para el guion
          fontSize: '20px',
          fontWeight: 'bold'
        }}>•</span>  {/* Este es el guion bonito */}
        {item}
      </li>
    ))}
  </ul>
);

export default function Convenios() {
  const [activeTab, setActiveTab] = useState(0); // Estado para las pestañas activas
  const theme = useTheme(); // Usar el tema actual

  return (
    <Box
      sx={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: { xs: '100%', sm: '90%', md: '85%', lg: '75%' }, // Adaptable con breakpoints
        margin: '0 auto',
        padding: '20px',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Convenios de Propiedad Intelectual
      </Typography>

      {/* Navegación de pestañas */}
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
            Convenios Internacionales
          </Button>
          <Button
            onClick={() => setActiveTab(1)}
            sx={{
              pb: 2,
              borderBottom: activeTab === 1 ? `2px solid ${theme.palette.primary.main}` : 'none',
              color: activeTab === 1 ? theme.palette.primary.main : theme.palette.text.secondary,
            }}
          >
            Convenios Nacionales
          </Button>
          <Button
            onClick={() => setActiveTab(2)}
            sx={{
              pb: 2,
              borderBottom: activeTab === 2 ? `2px solid ${theme.palette.primary.main}` : 'none',
              color: activeTab === 2 ? theme.palette.primary.main : theme.palette.text.secondary,
            }}
          >
            Convenios Regionales
          </Button>
          <Button
            onClick={() => setActiveTab(3)}
            sx={{
              pb: 2,
              borderBottom: activeTab === 3 ? `2px solid ${theme.palette.primary.main}` : 'none',
              color: activeTab === 3 ? theme.palette.primary.main : theme.palette.text.secondary,
            }}
          >
            Convenios Locales
          </Button>
        </Box>
      </Box>

      {/* Contenido de las pestañas */}
      <Box>
        {activeTab === 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>Convenios Internacionales</Typography>
            {renderList(convenios.internacionales)}
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>Convenios Nacionales</Typography>
            {renderList(convenios.nacionales)}
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>Convenios Regionales</Typography>
            {renderList(convenios.regionales)}
          </Box>
        )}

        {activeTab === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>Convenios Locales</Typography>
            {renderList(convenios.locales)}
          </Box>
        )}
      </Box>
    </Box>
  );
}
