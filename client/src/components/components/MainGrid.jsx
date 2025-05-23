import * as React from "react";
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import ChartUserByCountry from "./ChartUserByCountry";
import CustomizedTreeView from "./CustomizedTreeView";
import CustomizedDataGrid from "./CustomizedDataGrid";
import HighlightedCard from "./HighlightedCard";
import PageViewsBarChart from "./PageViewsBarChart";
import PageViewsChart from "./PageViewsChart";
import StatCard from "./StatCard";

const data = [
  {
    title: "Talleres",
    value: "280",
    interval: "Last 30 days",
    trend: "up",
    data: [2, 4, 3, 5, 7, 6, 8, 10],
  },
  {
    title: "Capacitacion",
    value: "327",
    interval: "Last 30 days",
    trend: "up",
    data: [1, 4, 3, 5, 7, 6, 8],
  },
  {
    title: "Oferta Laboral",
    value: "200",
    interval: "Last 30 days",
    trend: "neutral",
    data: [5, 4, 6, 3, 4, 3, 7, 6],
  },
  {
    title: "Voluntariado",
    value: "150",
    interval: "Last 30 days",
    trend: "up",
    data: [2, 4, 3, 4, 5, 4, 7, 8],
  },
];

export default function MainGrid() {
  return (
    <React.Fragment>
      {/* cards */}

      <Grid container spacing={2} columns={12}>
        {data.map((card, index) => (
          <Grid xs={3} >
            <StatCard key={index} {...card} />
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        spacing={2}
        direction={{ xs: "row-reverse", md: "row" }}
        columns={12}
      >
        <Grid xs={12} md={8} lg={9}>
          <Stack spacing={2}>
            <PageViewsBarChart />
            {/* <PageViewsChart /> */}
            <CustomizedDataGrid />
          </Stack>
        </Grid>
        <Grid xs={12} md={4} lg={3}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row", md: "column" }}
          >
            <CustomizedTreeView />
            <ChartUserByCountry />
          </Stack>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
