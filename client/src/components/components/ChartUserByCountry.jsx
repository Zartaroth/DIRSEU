import * as React from "react";
import PropTypes from "prop-types";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const data = [
  { label: "Facultad de Ciencias y Humanidades", value: 69 },
  { label: "Facultad de Ciencias de la Salud", value: 56 },
  { label: "Facultad Ciencias Económicas Administrativas y Contables", value: 99 },
  { label: "Facultad de Derecho y Ciencia Política", value: 35 },
  { label: "Facultad de Ingeniería y Arquitectura", value: 78 },
];

const countries = [
  {
    name: "Facultad de Ciencias y Humanidades",
    value: 50,
    color: "hsl(220, 25%, 65%)",
  },
  {
    name: "Facultad de Ciencias de la Salud",
    value: 35,
    color: "hsl(220, 25%, 45%)",
  },
  {
    name: "Facultad Ciencias Económicas Administrativas y Contables",
    value: 10,
    color: "hsl(220, 25%, 30%)",
  },
  {
    name: "Facultad de Derecho y Ciencia Política",
    value: 5,
    color: "hsl(220, 25%, 20%)",
  },
  {
    name: "Facultad de Ingeniería y Arquitectura",
    value: 5,
    color: "hsl(220, 25%, 20%)",
  },
];

const StyledText = styled("text", {
  shouldForwardProp: (prop) => prop !== "variant",
})(({ theme, variant }) => ({
  textAnchor: "middle",
  dominantBaseline: "central",
  fill: theme.palette.text.secondary,
  fontSize:
    variant === "primary"
      ? theme.typography.h5.fontSize
      : theme.typography.body2.fontSize,
  fontWeight:
    variant === "primary"
      ? theme.typography.h5.fontWeight
      : theme.typography.body2.fontWeight,
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

const colors = [
  "hsl(220, 25%, 65%)",
  "hsl(220, 25%, 45%)",
  "hsl(220, 25%, 30%)",
  "hsl(220, 25%, 20%)",
  "hsl(220, 25%, 20%)",
];

export default function ChartUserByFaculty() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          Users by faculty
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", pb: "8px" }}>
          <PieChart
            colors={colors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data,
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 0,
                highlightScope: { faded: "global", highlighted: "item" },
              },
            ]}
            height={260}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel primaryText="337" secondaryText="Total" />
          </PieChart>
        </Box>
        {countries.map((country, index) => (
          <Stack
            key={index}
            direction="row"
            alignItems="center"
            gap={2}
            sx={{ pb: 2, px: 2 }}
          >
            {country.flag}
            <Stack gap={1} sx={{ flexGrow: 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Typography variant="body2" fontWeight="500" fontSize="0.8rem">
                  {country.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {country.value}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={country.value}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: country.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
