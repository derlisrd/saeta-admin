import useEstadisticas from "@/core/hooks/home/useEstadisticas";
import { Container, Grid2 as Grid, LinearProgress, Typography } from "@mui/material";
import CardHome from "./card";

function Home() {
  const { data, isLoading } = useEstadisticas();

  return (
    <Container sx={{ mb: 5 }}>
      {data && (
        <Grid spacing={2} container>
          <Grid size={12}>{isLoading && <LinearProgress />}</Grid>
          <Grid size={12}>
            <Typography variant="h5">Estadísticas</Typography>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <CardHome data={data.ayer.importe.toLocaleString("es-PY")} title="Ayer" icon="calendar-clock"
              caption={'Cantidad pedidos: ' + data.ayer.cantidad}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <CardHome data={data.semana_pasada.importe.toLocaleString("es-PY")} title="Semana pasada" icon="calendar-event"
              caption={'Cantidad pedidos: ' + data.semana_pasada.cantidad} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}></Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <CardHome data={data.hoy.importe.toLocaleString("es-PY")} title="Hoy" icon="moneybag"
              caption={data.comparaciones.dia.porcentaje.toFixed(2) + '%'}
              captionColor={data.comparaciones.dia.porcentaje > 0 ? "green" : "red"}
              captionIcon={data.comparaciones.dia.porcentaje > 0 ? "arrow-big-up" : "arrow-big-down"}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <CardHome data={data.semana.importe.toLocaleString("es-PY")} title="Semana" icon="circle-dashed-check"
              caption={data.comparaciones.semana.porcentaje.toFixed(2) + '%'}
              captionColor={data.comparaciones.semana.porcentaje > 0 ? "green" : "red"}
              captionIcon={data.comparaciones.semana.porcentaje > 0 ? "arrow-big-up" : "arrow-big-down"}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <CardHome data={data.mes.importe.toLocaleString("es-PY")} title="Mes" icon="calendar-month"
              caption={data.comparaciones.mensual.porcentaje.toFixed(2) + '%'}
              captionColor={data.comparaciones.mensual.porcentaje > 0 ? "green" : "red"}
              captionIcon={data.comparaciones.mensual.porcentaje > 0 ? "arrow-big-up" : "arrow-big-down"}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="button">Lucro</Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <CardHome data={data.ayer.lucro.toLocaleString("es-PY")} title="De ayer" icon="chart-dots" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <CardHome data={data.hoy.lucro.toLocaleString("es-PY")} title="De hoy" icon="chart-histogram" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <CardHome data={data.semana.lucro.toLocaleString("es-PY")} title="De la semana" icon="chart-line" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <CardHome data={data.mes.lucro.toLocaleString("es-PY")} title="Del mes" icon="chart-pie" />
          </Grid>

        </Grid>
      )}
    </Container>
  );
}

export default Home;
