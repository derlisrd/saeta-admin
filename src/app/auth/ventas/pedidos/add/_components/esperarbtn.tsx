import { Button } from "@mui/material";
import useHook from "../_hooks/useHook";
import Icon from "@/components/ui/icon";

function EsperarButton() {
  const { pedidos, index, esperar } = useHook();
  return (
    pedidos[index].items.length > 0 && (
      <Button variant="outlined" endIcon={<Icon>stopwatch</Icon>} onClick={esperar} color="warning" fullWidth sx={{ padding: 2 }}>
        Esperar pedido
      </Button>
    )
  );
}

export default EsperarButton;
