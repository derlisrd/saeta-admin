import { Button } from "@mui/material";
import useHook from "../_hooks/useHook";
import Icon from "@/components/ui/icon";

function EsperarButton() {
  const { pedidos, index, esperar } = useHook();
  return (
    pedidos[index].items.length > 0 && (
      <Button startIcon={<Icon>stopwatch</Icon>} onClick={esperar} color="secondary" fullWidth sx={{ p: 2 }}>
        Esperar
      </Button>
    )
  );
}

export default EsperarButton;
