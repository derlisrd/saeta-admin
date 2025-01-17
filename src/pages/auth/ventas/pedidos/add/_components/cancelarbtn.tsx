import { Button } from "@mui/material";
import useHook from "../useHook";

function CancelarButton() {
  const { pedidos, index, cancelar } = useHook();

  if (pedidos.length > 1) {
    return (
      <Button variant="outlined" size="large" color="error" onClick={cancelar} fullWidth sx={{ padding: 2 }}>
        Cancelar
      </Button>
    );
  }
  if (pedidos[index].items.length > 0) {
    return (
      <Button variant="outlined" size="large" color="error" onClick={cancelar} fullWidth sx={{ padding: 2 }}>
        Cancelar
      </Button>
    );
  }

  return <></>;
}

export default CancelarButton;
