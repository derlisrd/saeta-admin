import { Button } from "@mui/material";
import useHook from "../useHook";

function FinalizarButton() {
  const { pedidos, index } = useHook();
  return (
    pedidos[index].items.length > 0 && (
      <Button variant="outlined" size="large" fullWidth sx={{ padding: 2 }}>
        Finalizar
      </Button>
    )
  );
}

export default FinalizarButton;
