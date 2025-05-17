import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
import { useTheme } from '@mui/material/styles';

function a11yProps(index) {
  return {
    id: `menu-item-${index}`,
    'aria-controls': `menu-itempanel-${index}`,
  };
}

const mainListItems = [
  { text: 'Home', icon: <HomeRoundedIcon />, link: '' },
  // { 
  //   text: 'Analitica', 
  //   icon: <AnalyticsRoundedIcon />, 
  //   link: 'analytics', 
  //   condition: (auth) => auth.getUser()?.type === 'coordinador' || auth.isAdmin 
  // },
  { 
    text: 'Coordinadores', 
    icon: <PeopleRoundedIcon />, 
    subItems: [
      { text: 'Desarrollo Formativo', link: 'coordinadores/DesarrolloFormativo' },
      { text: 'Desarrollo Sostenible', link: 'coordinadores/DesarrolloSostenible' },
      { text: 'Extensión Universitaria', link: 'coordinadores/ExtensionUniversitaria' },
      { text: 'Seguimiento al Egresado', link: 'coordinadores/SeguimientoEgresado' }
    ], 
    condition: (auth) => auth.isAdmin || auth.getUser()?.type === 'coordinador' 
  },
  { 
    text: 'Empleador', 
    icon: <PeopleRoundedIcon />, 
    link: 'empleador',
    condition: (auth) => auth.isAdmin || auth.getUser()?.type === 'empleador'
  },
  { 
    text: 'Inscripciones', 
    icon: <AssignmentRoundedIcon />, 
    link: 'inscripciones', 
    condition: (auth) => auth.isAdmin
  },
  { 
    text: 'Modulos', 
    icon: <AssignmentRoundedIcon />, 
    link: 'modules', 
    condition: (auth) => 
      auth.getUser()?.type === 'docente' || 
      auth.getUser()?.type === 'estudiante' ||
      auth.isAdmin 
  },
  {
    text: 'Instructores',
    icon: <AssignmentRoundedIcon />,
    link: 'instructor',
    condition: (auth) =>
      auth.getUser()?.type === 'instructor' ||
      auth.isAdmin
  },
];

const colors = {
  brand: {
    light: '#7B90AF', // Celeste UAC (botones)
    main: '#1C4378', // Azul UAC (fondo principal)
    contrastText: '#FFFFFF', // Texto en fondos oscuros
    blanco: '#00CDFF',
  },
};

export default function MenuContent() {
  const auth = useAuth();
  const [value, setValue] = React.useState(0);
  const location = useLocation(); // Obtener la ruta actual

  const handleChange = (index) => {
    setValue(index);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems
          .filter((item) => !item.condition || item.condition(auth))
          .map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                {item.subItems ? (
                  <>
                    <ListItemButton
                      selected={value === index}
                      sx={{
                        bgcolor: value === index ? colors.brand.light : 'transparent',
                        color: value === index ? colors.brand.contrastText : 'inherit',
                        '&:hover': {
                          bgcolor: colors.brand.light,
                          color: colors.brand.contrastText,
                        },
                      }}
                      onClick={() => handleChange(index)}
                    >
                      <ListItemIcon
                        sx={{
                          color: value === index
                            ? colors.brand.contrastText
                            : colors.brand.contrastText, // Asegura que siempre sea blanco
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem, subIndex) => (
                        <ListItemButton
                          key={subIndex}
                          sx={{
                            pl: 4,
                            bgcolor: location.pathname.includes(subItem.link)
                              ? colors.brand.light
                              : 'transparent',
                            color: location.pathname.includes(subItem.link)
                              ? colors.brand.contrastText
                              : 'inherit',
                            '&:hover': {
                              bgcolor: colors.brand.light,
                              color: colors.brand.contrastText,
                            },
                          }}
                          component={Link}
                          to={subItem.link}
                          onClick={() => handleChange(index)}
                        >
                          <ListItemIcon
                            sx={{
                              color: location.pathname.includes(subItem.link)
                                ? colors.brand.contrastText
                                : colors.brand.contrastText, // Siempre blanco
                            }}
                          >
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText primary={subItem.text} />
                        </ListItemButton>
                      ))}
                    </List>
                  </>
                ) : (
                  <ListItemButton
                    selected={value === index}
                    onClick={() => handleChange(index)}
                    component={Link}
                    to={item.link}
                    sx={{
                      bgcolor: value === index ? colors.brand.light : 'transparent',
                      color: value === index ? colors.brand.contrastText : 'inherit',
                      '&:hover': {
                        bgcolor: colors.brand.light,
                        color: colors.brand.contrastText,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: value === index
                          ? colors.brand.blanco
                          : colors.brand.gris
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                )}
              </ListItem>
            </React.Fragment>
          ))}
      </List>
    </Stack>
  );
}
