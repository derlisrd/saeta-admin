import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import useHook from "../useHook";

function ClientesModal() {
  const { modal, handleModal } = useHook();
  return (
    <Dialog fullWidth open={modal.clientes} onClose={() => handleModal("clientes", false)}>
      <DialogTitle>Clientes</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
}

export default ClientesModal;
