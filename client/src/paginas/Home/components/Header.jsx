import React from 'react';
import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from './fecha';
import NavbarBreadcrumbs from '../../../components/components/NavbarBreadcrumbs';
import MenuButton from './notificaciones';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import Search from './Search';

const Header = ({ showNotifications = true, maxWidth = '1700px' }) => {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth,
        pt: 1.5,
      }}
      spacing={2}
    >
      {/* Componente de breadcrumbs */}
      <NavbarBreadcrumbs />

      {/* Sección de acciones del header */}
      <Stack direction="row" sx={{ gap: 1 }}>
        {/* Selector de fecha */}
        <CustomDatePicker />
        
        {/* Notificaciones (opcional) */}
        {showNotifications && (
          <MenuButton showBadge aria-label="Open notifications">
            <NotificationsRoundedIcon />
          </MenuButton>
        )}
      </Stack>
    </Stack>
  );
};

export default Header;
