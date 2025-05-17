import * as React from 'react';
import { useAuth } from '../../../context/AuthProvider';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

// Paleta de colores
const colors = {
  brand: {
    light: '#00CDFF', // Celeste UAC (botones)
    main: '#1C4378', // Azul UAC (fondo principal)
    dark: '#122B4E', // Azul más oscuro derivado
    contrastText: '#FFFFFF', // Texto en fondos oscuros
  },
  accent: {
    green: '#66BB6A',
    red: '#EF5350',
  },
  text: {
    primary: '#263238', // Texto principal
    secondary: '#546E7A', // Texto secundario
  },
  divider: '#B0BEC5', // Color de líneas divisorias
};

// Generar color de fondo para los avatares según el nombre
function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `#${((hash & 0x00ffffff) | 0x1000000).toString(16).slice(1)}`;
  return color;
}

// Crear propiedades del avatar según el nombre
function stringAvatar(name) {
  const initials = name.match(/\b\w/g).slice(0, 2).join("");
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: colors.brand.contrastText,
    },
    children: initials,
  };
}

function SideMenuMobile({ open, toggleDrawer }) {
  const auth = useAuth();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: colors.brand.main, // Fondo del menú lateral
          color: colors.brand.contrastText, // Texto en el menú
        },
      }}
    >
      <Stack
        sx={{
          maxWidth: '70dvw',
          height: '100%',
        }}
      >
        {/* Header del menú */}
        <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
          <Stack
            direction="row"
            sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
          >
            <Avatar
              sizes="small"
              alt="User Avatar"
              sx={{
                width: 32,
                height: 32,
                boxShadow: 2,
              }}
              {...stringAvatar(`${auth.getUser()?.firstName} ${auth.getUser()?.lastName}`)}
            />
            <Typography 
              component="p" 
              variant="subtitle2" 
              sx={{ 
                ml: 2, 
                color: colors.brand.contrastText, // Texto blanco para contraste
                fontWeight: 'bold',
              }}
            >
              {auth.getUser()?.firstName || "Invitado"}
            </Typography>
          </Stack>
          <Stack
            sx={{
              flexGrow: 1, // Para permitir que ocupe el espacio disponible
              color: colors.brand.light, // Color del texto o íconos
              justifyContent: 'center', // Centrado vertical
              alignItems: 'center', // Centrado horizontal
            }}
          >
            <OptionsMenu />
          </Stack>
        </Stack>

        {/* Línea divisoria */}
        <Divider sx={{ borderColor: colors.divider }} />

        {/* Contenido del menú */}
        <Stack sx={{ flexGrow: 1, color: colors.brand.light }}>
          <MenuContent />
          <Divider sx={{ borderColor: colors.divider }} />
        </Stack>
      </Stack>
    </Drawer>
  );
}

SideMenuMobile.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;
