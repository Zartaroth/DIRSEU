import * as React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './components/BarraDesplegable';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import BienvenidaDirseu from './components/Bienvenida';
import AppTheme from './shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from './theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const location = useLocation();
  const isHome = location.pathname === "/Home";

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            padding: 2, 
          })}
        >
          <Stack
            sx={{
              width: '100%',
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
              {/* {isHome && <BienvenidaDirseu />} */}
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
