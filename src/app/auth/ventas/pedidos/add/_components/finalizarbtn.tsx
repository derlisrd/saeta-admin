import { Button } from "@mui/material";
import useHook from "../_hooks/useHook";
import useModal from "../_hooks/useModal";
import Icon from "@/components/ui/icon";

function FinalizarButton() {
  const { pedidos, index } = useHook();
  const { handleModal } = useModal();
  return (
    pedidos[index].items.length > 0 && (
      <Button endIcon={<Icon>arrow-narrow-right-dashed</Icon>} onClick={() => handleModal("formapago")} size="large" fullWidth sx={{ p: 2 }}>
        Proceder
      </Button>
    )
  );
}

export default FinalizarButton;
