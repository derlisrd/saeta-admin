import useThemeCustom from "@/hooks/useThemeCustom";
import { availableColors } from "@/theme/colors";
import { Button, Container } from "@mui/material";

function Tema() {
  const { changeColor } = useThemeCustom();
  return (
    <Container>
      <h3>Tema</h3>
      {availableColors.map((item, i) => (
        <Button
          key={i}
          onClick={() => {
            changeColor(item.color);
          }}
          sx={{ backgroundColor: item.color, margin: 1 }}
        >
          {item.name}
        </Button>
      ))}
    </Container>
  );
}

export default Tema;
