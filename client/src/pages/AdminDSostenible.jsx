import React from 'react';
import {
  AppBar, Toolbar, Typography, Container, Grid, Menu, MenuItem, Button, Box,
  useTheme, ThemeProvider, CssBaseline
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useNavigate, Outlet } from 'react-router-dom';

const AdministrarDSostenible = () => {
  const [anchorEls, setAnchorEls] = React.useState([null]);
  const theme = useTheme();
  const navigate = useNavigate();

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
      title: 'Calendario Ambiental',
      options: [
        { label: 'Ver Eventos del Calendario Ambiental', 
          path: '/Home/coordinadores/DesarrolloSostenible/ver-eventos-calendario' },
      ],
    },
    {
      title: 'Eventos',
      options: [
        { label: 'Ver Eventos', path:'/Home/coordinadores/DesarrolloSostenible/verEventos' },
      ],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Texto del Panel de Control alineado a la izquierda */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Panel de Control
          </Typography>
          {/* Botón desplegable alineado a la derecha */}
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

export default AdministrarDSostenible;
