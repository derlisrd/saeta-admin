import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import useHook from "../useHook";

function FinalizarPedido() {
  const { modal, handleModal } = useHook();
  return (
    <Dialog open={modal.finalizar} fullScreen onClose={() => handleModal("finalizar", false)}>
      <DialogTitle>Finalizar Pedido</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
}

export default FinalizarPedido;
