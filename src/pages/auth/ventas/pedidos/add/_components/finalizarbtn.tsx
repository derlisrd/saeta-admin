import { Button } from "@mui/material";
import useHook from "../_hooks/useHook";

function FinalizarButton() {
  const { pedidos, index, handleModal } = useHook();
  return (
    pedidos[index].items.length > 0 && (
      <Button variant="contained" onClick={() => handleModal("finalizar", true)} size="large" fullWidth sx={{ padding: 2 }}>
        Finalizar
      </Button>
    )
  );
}

export default FinalizarButton;
