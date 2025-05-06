import useThemeCustom from "@/hooks/useThemeCustom";
import { availableColors } from "@/theme/colors";
import { Box, Breadcrumbs, Button, Container, Paper, Slide, Typography } from "@mui/material";

function Tema() {
  const { changeColor } = useThemeCustom();
  return (
    <Container>
      <Breadcrumbs separator="›">
        <Typography variant="overline">Configuración</Typography>
        <Typography variant="overline">Tema</Typography>
      </Breadcrumbs>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Box boxShadow={4} padding={3} borderRadius={4} component={Paper}>
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
        </Box>
      </Slide>
    </Container>
  );
}

export default Tema;
