import * as React from 'react';
import Avatar from "@mui/material/Avatar";
import { styled } from '@mui/material/styles';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { paperClasses } from '@mui/material/Paper';
import { listClasses } from '@mui/material/List';
import Typography from "@mui/material/Typography";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import MenuButton from './MenuButton';
import { useAuth } from '../../../context/AuthProvider';
import { signOutRequest } from "../../../api/api";
import { Link } from 'react-router-dom';

const MenuItem = styled(MuiMenuItem)({
  margin: '2px 0',
});

function stringToColor(string) {
  let hash = 0;
  // Calcula un valor hash basado en el string
  for (let i = 0; i < string.length; i++) {
    // Suma los códigos ASCII de los caracteres y aplica desplazamiento a la izquierda y resta
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convierte el hash en un color hexadecimal
  const color = `#${((hash & 0x00ffffff) | 0x1000000).toString(16).slice(1)}`;
  return color;
}

function stringAvatar(name) {
  const initials = name.match(/\b\w/g).slice(0, 2).join("");
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
}

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const auth = useAuth();
  const role = auth.getUser()?.role;

  async function handleSignOut(e) {
    e.preventDefault();

    try {
      const response = await signOutRequest(auth.getRefreshToken());

      if (response.ok) {
        auth.signOut();
      }
    } catch (error) {}

    setAnchorEl(null);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Define las rutas según el rol
  const userInfoRoute = role === 'egresado' ? '/Alumni/userInfo' : 'userInfo';
  const changePasswordRoute = role === 'egresado' ? '/Alumni/cambiar-password' : 'cambiar-password';
  const cvDigital = role === 'egresado' ? '/Alumni/CV-digital' : '';

  return (
    <React.Fragment>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: 'transparent' }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: '4px',
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: '4px -4px',
          },
        }}
      >
        <MenuItem sx={{ mt: 1 }}>
          <Avatar
            sizes="small"
            alt="Riley Carter"
            src="/static/images/avatar/7.jpg"
            sx={{
              width: 24,
              height: 24,
              mr: 1,
            }}
            {...stringAvatar(
              `${auth.getUser()?.firstName} ${auth.getUser()?.lastName}`
            )}
          />

          <Typography component="p" variant="subtitle2" sx={{ ml: 2 }}>
            {auth.getUser()?.firstName || ""}
          </Typography>
        </MenuItem>
        <Link
          to={userInfoRoute}
          style={{ textDecoration: "none", color: "inherit" }}
          replace
        >
          <MenuItem onClick={handleClose}>Perfil</MenuItem>
        </Link>

        {/* Redirección condicional a Cambiar Contraseña */}
        <Link
          to={changePasswordRoute}
          style={{ textDecoration: "none", color: "inherit" }}
          replace
        >
          <MenuItem onClick={handleClose}>Cambiar Contraseña</MenuItem>
        </Link>
        {/* Redirección para crear el CV digital */}
        {role === 'egresado' && (
          <Link
            to={cvDigital}
            style={{ textDecoration: "none", color: "inherit" }}
            replace
          >
            <MenuItem onClick={handleClose}>Crear CV</MenuItem>
          </Link>
        )}

        <Divider />
        <MenuItem
          onClick={handleClose}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: 'auto',
              minWidth: 0,
            },
          }}
        >
          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}