import { Button } from "@mui/material";
import useHook from "../_hooks/useHook";
import useModal from "../_hooks/useModal";

function FinalizarButton() {
  const { pedidos, index } = useHook();
  const { handleModal } = useModal();
  return (
    pedidos[index].items.length > 0 && (
      <Button variant="contained" onClick={() => handleModal("formapago")} size="large" fullWidth sx={{ padding: 2 }}>
        Finalizar
      </Button>
    )
  );
}

export default FinalizarButton;
