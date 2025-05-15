import useThemeCustom from "@/hooks/useThemeCustom";
import { availableColors } from "@/theme/colors";
import { Box, Breadcrumbs, Button, Container, Paper, Slide, Stack, Typography } from "@mui/material";

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
          {availableColors.map((item, i) => (
            <Button
              key={i}
              onClick={() => {
                changeColor(item);
              }}
              sx={{ backgroundColor: item.color, margin: 1 }}
            >
              {item.name}
            </Button>
          ))}
          <Typography display='block' mt={4} variant="button">Colores:</Typography>
          <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>

            <Button color="primary" variant="contained">
              Color primario
            </Button>
            <Button color="secondary" variant="contained">
              Color secundario
            </Button>
            <Button color="primary" variant="outlined">
              Color primario
            </Button>
            <Button color="secondary" variant="outlined">
              Color secundario
            </Button>
          </Stack>
        </Box>
      </Slide>
    </Container>
  );
}

export default Tema;
