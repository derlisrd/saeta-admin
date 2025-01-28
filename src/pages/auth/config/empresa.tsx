import useConfigEmpresa from "@/core/hooks/config/useConfigEmpresa";
import { Box, Breadcrumbs, Container, Grid2 as Grid, Paper, TextField, Typography, Button, Snackbar, Alert, LinearProgress } from "@mui/material";

function Empresa() {
  const { empresa, success, clearSuccess, onChange, loading, updateEmpresa } = useConfigEmpresa();

  return (
    <Container>
      <h3>Empresa</h3>
      <Breadcrumbs separator="›">
        <Typography variant="overline">Configuración</Typography>
        <Typography variant="overline">Empresa</Typography>
      </Breadcrumbs>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={success.active} autoHideDuration={6000} onClose={clearSuccess}>
        <Alert onClose={clearSuccess} severity="success" variant="filled" sx={{ width: "100%" }}>
          {success.message}
        </Alert>
      </Snackbar>
      {loading ? (
        <LinearProgress />
      ) : (
        <Box boxShadow={4} padding={3} borderRadius={4} component={Paper}>
          <Grid container spacing={{ xs: 3, md: 2 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Nombre de empresa" fullWidth name="nombre" onChange={({ target }) => onChange(target.name, target.value)} value={empresa?.nombre} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField onChange={({ target }) => onChange(target.name, target.value)} name="ruc" label="RUC" fullWidth value={empresa?.ruc} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField name="telefono" onChange={({ target }) => onChange(target.name, target.value)} label="Teléfono" fullWidth value={empresa?.telefono} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Dirección"
                name="direccion"
                onChange={({ target }) => {
                  onChange(target.name, target.value);
                }}
                fullWidth
                value={empresa?.direccion}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Propietario"
                name="propietario"
                onChange={({ target }) => {
                  onChange(target.name, target.value);
                }}
                fullWidth
                value={empresa?.propietario}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button onClick={updateEmpresa}>GUARDAR</Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default Empresa;
