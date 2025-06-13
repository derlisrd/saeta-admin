import { Button } from "@mui/material";
import useHook from "../_hooks/useHook";
import Icon from "@/components/ui/icon";

function CancelarButton() {
  const { pedidos, index, cancelar } = useHook();

  if (pedidos.length > 1) {
    return (
      <Button endIcon={<Icon name='trash' />} variant="outlined" color="warning" onClick={cancelar} fullWidth sx={{ padding: 2 }}>
        Cancelar
      </Button>
    );
  }
  if (pedidos[index].items.length > 0) {
    return (
      <Button endIcon={<Icon name='trash' />} variant="outlined" color="warning" onClick={cancelar} fullWidth sx={{ padding: 2 }}>
        Cancelar
      </Button>
    );
  }

  return <></>;
}

export default CancelarButton;
