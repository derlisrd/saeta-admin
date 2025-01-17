import { Button } from "@mui/material";
import useHook from "../useHook";

function CancelarButton() {
  const { pedidos, index, cancelar } = useHook();
  return (
    pedidos[index].items.length > 0 && (
      <Button variant="outlined" size="large" color="error" onClick={cancelar} fullWidth sx={{ padding: 2 }}>
        Cancelar
      </Button>
    )
  );
}

export default CancelarButton;
