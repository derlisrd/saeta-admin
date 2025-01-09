import useConfigEmpresa from "@/core/hooks/config/useConfigEmpresa";
import { Box, Breadcrumbs, Grid2 as Grid, Paper, TextField, Typography } from "@mui/material";

function Empresa() {
  const { empresa } = useConfigEmpresa();

  return (
    <Box>
      <h3>Empresa</h3>
      <Breadcrumbs separator="›">
        <Typography variant="overline">Configuración</Typography>
        <Typography variant="overline">Empresa</Typography>
      </Breadcrumbs>

      <Box boxShadow={4} padding={3} borderRadius={3} component={Paper}>
        <Grid container>
          <Grid size={{ xs: 12 }}>
            <TextField label="Nombre de empresa" fullWidth value={empresa?.nombre} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Empresa;
