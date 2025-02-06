import useHook from "../_hooks/useHook";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Zoom } from "@mui/material";
import useModal from "../_hooks/useModal";

function ErrorModal() {
  const { result: data } = useHook();
  const { modal, handleModal } = useModal();
  return (
    <Dialog open={modal.error} onClose={() => handleModal("error")} TransitionComponent={Zoom}>
      <DialogTitle>Error al crear pedido</DialogTitle>
      <DialogContent>
        <div>
          <p>{data?.message}</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => handleModal("error")}>
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorModal;
