import React from 'react';
import {
  AppBar, Toolbar, Typography, Container, Grid, Menu, MenuItem, Button, IconButton, Box,
  useTheme, ThemeProvider, createTheme, CssBaseline
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useNavigate, Outlet } from 'react-router-dom';

const AdministrarSEgresado = () => {
  const [anchorEls, setAnchorEls] = React.useState([null]);
  const theme = useTheme();
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const handleClick = (event, index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = event.currentTarget;
    setAnchorEls(newAnchorEls);
  };

  const handleClose = (index) => {
    const newAnchorEls = [...anchorEls];
    newAnchorEls[index] = null;
    setAnchorEls(newAnchorEls);
  };

  const handleMenuItemClick = (path) => {
    navigate(path); // Navegar a la ruta correspondiente
    setAnchorEls([null]); // Cerrar el menú desplegable
  };

  const menuItems = [
    {
      title: 'Capacitaciones',
      options: [
        { label: 'Ver Inscritos', path:'/Home/coordinadores/SeguimientoEgresado/verInscritos' },
        { label: 'Ver Capacitaciones', path: '/Home/coordinadores/SeguimientoEgresado/verCapacitaciones' },
      ],
    },
    {
      title: 'Empleadores',
      options: [
        { label: 'Agregar Empleadores', path:'/Home/coordinadores/SeguimientoEgresado/userEmForm' },
        { label: 'Ver Empleadores', path: '/Home/coordinadores/SeguimientoEgresado/verCapacitaciones' },
      ],
    },
    {
      title: 'Bolsa Laboral',
      options: [
        { label: 'Ver Bolsa Laboral', path:'/Home/coordinadores/SeguimientoEgresado/verOfertas'}
      ],
    },
    {
      title: 'Eventos',
      options: [
        { label: 'Ver Eventos', path:'/Home/coordinadores/SeguimientoEgresado/verEventos' },
      ],
    },
    {
      title: 'Encuestas',
      options: [
        { label: 'Ver Encuestas', path:'/Home/coordinadores/SeguimientoEgresado/ver-encuestas'}
      ]
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Panel de Control
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {menuItems.map((menu, index) => (
              <Box key={index} sx={{ ml: 2 }}>
                <Button
                  aria-controls={`menu-${index}`}
                  aria-haspopup="true"
                  onClick={(event) => handleClick(event, index)}
                  endIcon={<ExpandMoreIcon />}
                  variant="contained"
                  color="secondary"
                >
                  {menu.title}
                </Button>
                <Menu
                  id={`menu-${index}`}
                  anchorEl={anchorEls[index]}
                  keepMounted
                  open={Boolean(anchorEls[index])}
                  onClose={() => handleClose(index)}
                >
                  {menu.options.map((option, optionIndex) => (
                    <MenuItem key={optionIndex} onClick={() => handleMenuItemClick(option.path)}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Outlet /> 
        </Box>
    </ThemeProvider>
  );
};

export default AdministrarSEgresado;
