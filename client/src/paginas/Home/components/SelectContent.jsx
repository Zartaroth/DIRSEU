import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import { Button, Avatar, ListItemAvatar, ListItemText } from '@mui/material';

// Personalización del Avatar original de Material UI
const CustomAvatar = styled(Avatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  color: (theme.vars || theme).palette.text.secondary,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
}));

// Personalización del ListItemAvatar original de Material UI
const CustomListItemAvatar = styled(ListItemAvatar)(() => ({
  minWidth: 0,
  marginRight: 12,
}));

export default function CustomButton() {
  const theme = useTheme(); // Obtener el tema actual (oscuro o claro)

  return (
    <Button
      variant="contained"
      href="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '10px 16px',
        width: '100%',
        textTransform: 'none',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      <DevicesRoundedIcon sx={{ marginRight: 1 }} />
      Volver al inicio
    </Button>
  );
}
