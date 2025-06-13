import Icon from "@/components/ui/icon";
import useThemeCustom from "@/hooks/useThemeCustom";
import { availableColors } from "@/theme/colors";
import { Box, Breadcrumbs, Button, Container, Grid2 as Grid, Paper, Slide, Stack, Typography } from "@mui/material";

function Tema() {
  const { changeColor } = useThemeCustom();
  return (
    <Container>
      <Breadcrumbs separator="›">
        <Typography variant="overline">Configuración</Typography>
        <Typography variant="overline">Tema</Typography>
      </Breadcrumbs>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Box boxShadow={4} padding={3} borderRadius={4} mb={2} component={Paper}>
          <Stack spacing={2} direction='row'>
            {availableColors.map((item, i) => (
              <Button
                key={i}
                onClick={() => {
                  changeColor(item);
                }}
                sx={{ backgroundColor: item.color, margin: 1 }}
                startIcon={<Icon name='brush' />}
              >
                {item.name}
              </Button>
            ))}
          </Stack>
          <Typography display='block' mt={4} variant="button">Colores:</Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} >
              <Button fullWidth color="primary" variant="contained">
                Color primario
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} ><Button fullWidth color="secondary" variant="contained">
              Color secundario
            </Button></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} ><Button fullWidth color="primary" variant="outlined">
              Color primario
            </Button></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} ><Button fullWidth color="secondary" variant="outlined">
              Color secundario
            </Button></Grid>
          </Grid>

        </Box>
      </Slide>
    </Container>
  );
}

export default Tema;
