import Icon from "@/components/ui/icon";
import useConfigEmpresa from "@/core/hooks/config/useConfigEmpresa";
import { Box, Breadcrumbs, Container, Grid, Paper, TextField, Typography, Button, Snackbar, Alert, LinearProgress, Slide, Stack } from "@mui/material";

function Empresa() {
  const { empresa, success, clearSuccess, onChange, isLoading, updateEmpresa } = useConfigEmpresa();

  return (
    <Container>
      <Breadcrumbs separator="›">
        <Typography variant="overline">Configuración</Typography>
        <Typography variant="overline">Empresa</Typography>
      </Breadcrumbs>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={success.active} autoHideDuration={6000} onClose={clearSuccess}>
        <Alert onClose={clearSuccess} severity="success" variant="filled" sx={{ width: "100%" }}>
          {success.message}
        </Alert>
      </Snackbar>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
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
                  value={empresa?.propietario ?? ""}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button disabled={isLoading} size="large" startIcon={<Icon name='device-floppy' />} onClick={updateEmpresa} variant="contained">
                    Guardar
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Slide>
      )}
    </Container>
  );
}

export default Empresa;
