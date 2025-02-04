import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, TextField } from "@mui/material";
import useHook from "../_hooks/useHook";

function RegistroClienteModal() {
  const { modal, handleModal } = useHook();
  return (
    <Dialog
      fullWidth
      open={modal.registro}
      onClose={() => {
        handleModal("registro");
      }}
    >
      <DialogTitle>Registrar cliente</DialogTitle>
      <DialogContent>
        <Grid container gap={3}>
          <Grid size={12}>
            <TextField label="Documento o RUC" fullWidth />
          </Grid>
          <Grid size={12}>
            <TextField label="Nombres" fullWidth />
          </Grid>
          <Grid size={12}>
            <TextField label="Apellidos" fullWidth />
          </Grid>
          <Grid size={12}>
            <TextField label="Correo electronico" fullWidth />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => handleModal("registro")}>
          Registrar
        </Button>
        <Button variant="outlined" onClick={() => handleModal("registro")}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegistroClienteModal;
