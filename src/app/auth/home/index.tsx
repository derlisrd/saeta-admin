import useEstadisticas from "@/core/hooks/home/useEstadisticas";
import { Container, Grid2 as Grid, LinearProgress } from "@mui/material";
import CardHome from "./card";

function Home() {
  const { data, isLoading } = useEstadisticas();

  return (
    <Container>
      {data && (
        <Grid spacing={2} container>
          <Grid size={12}>{isLoading && <LinearProgress />}</Grid>
          <Grid size={12}>
            <h3>Ventas</h3>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CardHome data={data.hoy.importe.toLocaleString("es-PY")} title="Ventas de hoy" icon="moneybag" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CardHome data={data.semana.importe.toLocaleString("es-PY")} title="Ventas de semana" icon="circle-dashed-check" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CardHome data={data.mes.importe.toLocaleString("es-PY")} title="Ventas del mes" icon="calendar-month" />
          </Grid>
          <Grid size={12}>
            <h3>Lucros</h3>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CardHome data={data.hoy.lucro.toLocaleString("es-PY")} title="Lucro de hoy" icon="chart-histogram" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CardHome data={data.semana.lucro.toLocaleString("es-PY")} title="Lucro de semana" icon="chart-line" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CardHome data={data.mes.lucro.toLocaleString("es-PY")} title="Lucro del mes" icon="chart-pie" />
          </Grid>
          <Grid size={12}>
            <h3>Pedidos</h3>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CardHome data={data.hoy.cantidad} title="Cantidad pedidos de hoy" icon="forklift" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CardHome data={data.semana.cantidad} title="Cantidad pedidos de semana" icon="basket-up" />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CardHome data={data.mes.cantidad} title="Cantidad pedidos de mes" icon="chart-bar" />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Home;
