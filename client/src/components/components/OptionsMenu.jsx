import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MenuButton from "./MenuButton";
import { useAuth } from "../../context/AuthProvider";
import { signOutRequest } from "../../api/api";
import { Link } from "react-router-dom";

function stringToColor(string) {
  let hash = 0;
  // Calcula un valor hash basado en el string
  for (let i = 0; i < string.length; i++) {
    // Suma los códigos ASCII de los caracteres y aplica desplazamiento a la izquierda y resta
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convierte el hash en un color hexadecimal
  const color = `#${((hash & 0x00ffffff) | 0x1000000).toString(16).slice(1)}`;
  // 1. (hash & 0x00ffffff): Se asegura de que tengamos solo 6 dígitos hexadecimales.
  // 2. | 0x1000000: Agrega un valor para garantizar al menos 7 dígitos hexadecimales.
  // 3. .toString(16): Convierte el número en una cadena hexadecimal.
  // 4. .slice(1): Elimina el primer carácter de la cadena, que es un '1' agregado en el paso anterior.

  return color;
}

function stringAvatar(name) {
  const initials = name.match(/\b\w/g).slice(0, 2).join("");
  // 1. name.match(/\b\w/g): Busca todas las letras que forman palabras completas en el nombre.
  //    - \b: Coincide con un límite de palabra.
  //    - \w: Coincide con cualquier carácter de palabra.
  //    - g: Realiza la búsqueda globalmente en toda la cadena.
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
  return (
    <React.Fragment>
      <MenuButton onClick={handleClick}>
        <MoreVertRoundedIcon />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
        <Divider />
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Add another account</MenuItem>
        <Link
          to="userInfo"
          style={{ textDecoration: "none", color: "inherit" }}
          replace
        >
          <MenuItem onClick={handleClose}>Settings</MenuItem>
        </Link>
        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
