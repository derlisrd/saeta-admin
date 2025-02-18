import useThemeCustom from "@/hooks/useThemeCustom";
import { availableColors } from "@/theme/colors";
import { Box, Breadcrumbs, Button, Container, Paper, Typography } from "@mui/material";

function Tema() {
  const { changeColor } = useThemeCustom();
  return (
    <Container>
      <h3>Tema</h3>
      <Breadcrumbs separator="›">
        <Typography variant="overline">Configuración</Typography>
        <Typography variant="overline">Tema</Typography>
      </Breadcrumbs>
      <Box boxShadow={4} padding={3} borderRadius={4} component={Paper}>
        {availableColors.map((item, i) => (
          <Button
            key={i}
            onClick={() => {
              changeColor(item.color, item.secondary);
            }}
            sx={{ backgroundColor: item.color, margin: 1 }}
          >
            {item.name}
          </Button>
        ))}
      </Box>
    </Container>
  );
}

export default Tema;
