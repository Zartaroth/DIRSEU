import * as React from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { Link } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';

// Paleta de colores actualizada
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

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `#${((hash & 0x00ffffff) | 0x1000000).toString(16).slice(1)}`;
  return color;
}

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

const drawerWidth = 220;

const Drawer = styled(MuiDrawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    backgroundColor: colors.brand.main, // Azul UAC
    color: colors.brand.contrastText, // Texto blanco
    boxShadow: theme.shadows[3],
  },
}));

export default function SideMenu() {
  const auth = useAuth();
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box>
      <Divider sx={{ borderColor: colors.divider }} />
      <MenuContent />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: `1px solid ${colors.divider}`,
        }}
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
            color: colors.brand.contrastText,
            fontWeight: 'bold',
          }}
        >
          {auth.getUser()?.firstName || "Invitado"}
        </Typography>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
