import { Dialog, DialogContent, DialogTitle, Grid2 as Grid, TextField } from "@mui/material";
import useHook from "../_hooks/useHook";

function RegistroClienteModal() {
  const { modal, handleModal } = useHook();
  return (
    <Dialog
      fullWidth
      open={modal.registro}
      onClose={() => {
        handleModal("registro", false);
      }}
    >
      <DialogTitle>Registrar cliente</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid size={12}>
            <TextField label="Nombre" />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default RegistroClienteModal;
