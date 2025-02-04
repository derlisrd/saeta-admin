import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, TextField } from "@mui/material";
import useHook from "../_hooks/useHook";
import useRegistroCliente from "../_hooks/useRegistroCliente";

function RegistroClienteModal() {
  const { modal, handleModal } = useHook();

  const { form, handleForm, verificarPorDocumento } = useRegistroCliente();

  const cerrar = () => {
    handleModal("registro");
  };

  return (
    <Dialog fullWidth open={modal.registro} onClose={cerrar}>
      <DialogTitle>Registrar cliente</DialogTitle>
      <DialogContent>
        <Grid container spacing={{ xs: 2 }} mt={2}>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              label="Documento o RUC"
              fullWidth
              required
              onBlur={(e) => {
                verificarPorDocumento(e.target.value);
              }}
              value={form.doc}
              onChange={(e) => {
                handleForm("doc", e.target.value);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Nombres"
              fullWidth
              value={form.nombres}
              onChange={(e) => {
                handleForm("nombres", e.target.value);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Apellidos"
              fullWidth
              value={form.apellidos}
              onChange={(e) => {
                handleForm("apellidos", e.target.value);
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              label="Correo electronico"
              fullWidth
              value={form.email}
              onChange={(e) => {
                handleForm("email", e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => handleModal("registro")}>
          Registrar
        </Button>
        <Button variant="outlined" onClick={cerrar}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegistroClienteModal;
