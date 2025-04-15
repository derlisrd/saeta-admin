import Icon from "@/components/ui/icon";
import { Button, Grid2 as Grid } from "@mui/material";
import { useEffect } from "react";

interface TecladoProps {
  onEnter: () => void;
  onNumberClick: (value: string) => void;
  onBackspace: () => void;
}

function Teclado({ onEnter, onNumberClick, onBackspace }: TecladoProps) {
  // Función para manejar el clic en los botones numéricos
  const handleNumberClick = (value: string) => {
    onNumberClick(value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      // Verifica si la tecla presionada es un número del 0-9
      if (/^[0-9]$/.test(key)) {
        handleNumberClick(key);
      }
      // Verifica si es la tecla Enter
      else if (key === "Enter") {
        onEnter();
      }
      // Verifica si es la tecla de retroceso (Backspace)
      else if (key === "Backspace") {
        onBackspace();
      }
      // Para el punto decimal
      else if (key === ".") {
        handleNumberClick(".");
      }
    };

    // Agrega el event listener al montar el componente
    window.addEventListener("keydown", handleKeyDown);
    // Limpia el event listener al desmontar el componente
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onEnter, onBackspace, onNumberClick]);

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 3 }}>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 16, sm: 24 } }} onClick={() => handleNumberClick("1")}>
          1
        </Button>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 16, sm: 24 } }} onClick={() => handleNumberClick("2")}>
          2
        </Button>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 16, sm: 24 } }} onClick={() => handleNumberClick("3")}>
          3
        </Button>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" variant="outlined" fullWidth onClick={onBackspace} startIcon={<Icon size={42}>arrow-narrow-left-dashed</Icon>} />
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 16, sm: 24 } }} onClick={() => handleNumberClick("4")}>
          4
        </Button>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 16, sm: 24 } }} onClick={() => handleNumberClick("5")}>
          5
        </Button>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 16, sm: 24 } }} onClick={() => handleNumberClick("6")}>
          6
        </Button>
      </Grid>
      <Grid size={{ xs: 3 }}></Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 16, sm: 24 } }} onClick={() => handleNumberClick("7")}>
          7
        </Button>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 16, sm: 24 } }} onClick={() => handleNumberClick("8")}>
          8
        </Button>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 16, sm: 24 } }} onClick={() => handleNumberClick("9")}>
          9
        </Button>
      </Grid>
      <Grid size={{ xs: 3 }}></Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 16, sm: 24 } }} variant="outlined" onClick={() => handleNumberClick("000")}>
          000
        </Button>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 16, sm: 24 } }} onClick={() => handleNumberClick("0")}>
          0
        </Button>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" variant="outlined" fullWidth sx={{ fontSize: { xs: 16, sm: 24 } }} onClick={() => handleNumberClick("0")}>
          .
        </Button>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <Button size="large" variant="outlined" sx={{ fontSize: { xs: 16, sm: 24 } }} fullWidth onClick={onEnter} startIcon={<Icon size={42}>corner-down-left</Icon>} />
      </Grid>
    </Grid>
  );
}

export default Teclado;
