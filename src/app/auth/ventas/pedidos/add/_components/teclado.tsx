import Icon from "@/components/ui/icon";
import { Button, Box } from "@mui/material";
import { useEffect } from "react";

interface TecladoProps {
  onEnter: () => void;
  onNumberClick: (value: string) => void;
  onBackspace: () => void;
  clear?: () => void;
}

function Teclado({ onEnter, onNumberClick, onBackspace, clear }: TecladoProps) {
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
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        gap: { xs: 0.5, sm: 2 },
      }}
    >
      {/* Primera fila */}
      <Box>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 12, sm: 24 }, height: "100%" }} onClick={() => handleNumberClick("1")}>
          1
        </Button>
      </Box>
      <Box>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 12, sm: 24 }, height: "100%" }} onClick={() => handleNumberClick("2")}>
          2
        </Button>
      </Box>
      <Box>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 12, sm: 24 }, height: "100%" }} onClick={() => handleNumberClick("3")}>
          3
        </Button>
      </Box>
      <Box>
        <Button size="large" variant="outlined" fullWidth sx={{ height: "100%" }} onClick={onBackspace} startIcon={<Icon size={24}>arrow-narrow-left-dashed</Icon>} />
      </Box>

      {/* Segunda fila */}
      <Box>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 12, sm: 24 }, height: "100%" }} onClick={() => handleNumberClick("4")}>
          4
        </Button>
      </Box>
      <Box>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 12, sm: 24 }, height: "100%" }} onClick={() => handleNumberClick("5")}>
          5
        </Button>
      </Box>
      <Box>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 12, sm: 24 }, height: "100%" }} onClick={() => handleNumberClick("6")}>
          6
        </Button>
      </Box>

      {/* Botón Enter que ocupa 2 filas */}
      <Box sx={{ gridRow: "span 2" }}>
        <Button
          variant="outlined"
          sx={{
            fontSize: { xs: 12, sm: 24 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          fullWidth
          onClick={onEnter}
          startIcon={<Icon size={36}>corner-down-left</Icon>}
        />
      </Box>

      {/* Tercera fila */}
      <Box>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 12, sm: 24 }, height: "100%" }} onClick={() => handleNumberClick("7")}>
          7
        </Button>
      </Box>
      <Box>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 12, sm: 24 }, height: "100%" }} onClick={() => handleNumberClick("8")}>
          8
        </Button>
      </Box>
      <Box>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 12, sm: 24 }, height: "100%" }} onClick={() => handleNumberClick("9")}>
          9
        </Button>
      </Box>

      {/* Cuarta fila */}
      <Box>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 12, sm: 24 }, height: "100%" }} variant="outlined" onClick={() => handleNumberClick("000")}>
          000
        </Button>
      </Box>
      <Box>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 12, sm: 24 }, height: "100%" }} onClick={() => handleNumberClick("0")}>
          0
        </Button>
      </Box>
      <Box>
        <Button size="large" variant="outlined" fullWidth sx={{ fontSize: { xs: 12, sm: 24 }, height: "100%" }} onClick={() => handleNumberClick(".")}>
          .
        </Button>
      </Box>
      <Box>
        <Button size="large" fullWidth sx={{ fontSize: { xs: 12, sm: 16 }, height: "100%" }} onClick={clear} endIcon={<Icon>trash</Icon>}>
          Limpiar
        </Button>
      </Box>
    </Box>
  );
}

export default Teclado;
