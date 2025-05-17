import React from 'react';
import {
  AppBar, Toolbar, Typography, Menu, MenuItem, Button, IconButton, Box,
  useTheme, ThemeProvider, CssBaseline
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useNavigate, Outlet } from 'react-router-dom';

const AdministrarEmpleador = () => {
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
    navigate(path);
    setAnchorEls([null]);
  };

  const menuItems = [
    {
      title: 'Empleos',
      options: [
        { label: 'Ver Postulantes', path:'/Home/empleador/postulantes' },
        { label: 'Ver Empleos', path: '/Home/empleador/empleos' },
      ],
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Alineación del texto a la izquierda */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Panel de Control
          </Typography>
          {/* Botones desplegables alineados a la derecha */}
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

export default AdministrarEmpleador;
