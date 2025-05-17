import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Avatar } from "@mui/material";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  "& .MuiBreadcrumbs-separator": {
    color: theme.palette.action.disabled,
  },
  "& .MuiBreadcrumbs-ol": {
    alignItems: "normal",
  },
}));

export default function NavbarBreadcrumbs() {
  return (
    <StyledBreadcrumbs aria-label="breadcrumb">
      <Avatar
        src="https://upload.wikimedia.org/wikipedia/commons/e/e4/CRSL_01.png"
        sx={{ marginTop: -2, width: 50, height: 50 }}
      />
      <Typography fontWeight="medium" color="text.primary">
        DIRSEU
      </Typography>
    </StyledBreadcrumbs>
  );
}
