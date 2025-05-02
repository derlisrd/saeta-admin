import { DialogTitle, Dialog, Grid2 as Grid, DialogContent, DialogActions, Button } from "@mui/material";
import useHook from "../_hooks/useHook";
import useModal from "../_hooks/useModal";

function DescuentoModal() {
  const {} = useHook();
  const { modal, handleModal } = useModal();

  return (
    <Dialog fullWidth open={modal.descuento} onClose={() => handleModal("descuento")} disableRestoreFocus>
      <DialogTitle>Descuento</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} pt={1}>
          <Grid size={12}></Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            handleModal("descuento");
          }}
        >
          Registrar nuevo
        </Button>
        <Button variant="outlined" onClick={() => handleModal("descuento")}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DescuentoModal;
