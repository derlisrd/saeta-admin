import useHook from "../_hooks/useHook";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Zoom } from "@mui/material";
function ErrorModal() {
  const { modal, handleModal, result: data } = useHook();
  return (
    <Dialog open={modal.error} onClose={() => handleModal("error", false)} TransitionComponent={Zoom}>
      <DialogTitle>Error al crear pedido</DialogTitle>
      <DialogContent>
        <div>
          <p>{data?.message}</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => handleModal("error", false)}>
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorModal;
