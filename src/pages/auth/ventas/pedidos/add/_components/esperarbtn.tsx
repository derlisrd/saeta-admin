import { Button } from "@mui/material";
import useHook from "../_hooks/useHook";

function EsperarButton() {
  const { pedidos, index, esperar } = useHook();
  return (
    pedidos[index].items.length > 0 && (
      <Button variant="outlined" size="large" onClick={esperar} color="warning" fullWidth sx={{ padding: 2 }}>
        Esperar pedido
      </Button>
    )
  );
}

export default EsperarButton;
