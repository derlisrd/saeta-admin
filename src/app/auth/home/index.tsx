import Icon from "@/components/ui/icon";
import useEstadisticas from "@/core/hooks/home/useEstadisticas";
import { Box, Card, CardContent, Container, Grid2 as Grid, LinearProgress, Stack, Typography } from "@mui/material";

function Home() {
  const { data, isLoading } = useEstadisticas();

  return (
    <Container>
      <h3>Vision general</h3>
      {data && (
        <Grid spacing={2} container>
          <Grid size={12}>{isLoading && <LinearProgress />}</Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5">{data.hoy.importe.toLocaleString("es-PY")}</Typography>
                    <Typography variant="caption">Ventas de hoy</Typography>
                  </Box>
                  <Icon size={36}>calendar</Icon>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5">{data.semana.importe.toLocaleString("es-PY")}</Typography>
                    <Typography variant="caption">Ventas de semana</Typography>
                  </Box>
                  <Icon size={36}>calendar-week</Icon>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card sx={{ boxShadow: 4 }}>
              <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5">{data.mes.importe.toLocaleString("es-PY")}</Typography>
                    <Typography variant="caption">Ventas del mes</Typography>
                  </Box>
                  <Icon size={36}>calendar-month</Icon>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Home;
