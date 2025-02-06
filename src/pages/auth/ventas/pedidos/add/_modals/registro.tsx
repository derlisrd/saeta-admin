import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress, TextField } from "@mui/material";
import useHook from "../_hooks/useHook";
import useRegistroCliente from "../_hooks/useRegistroCliente";
import useModal from "../_hooks/useModal";

function RegistroClienteModal() {
  const { setCliente } = useHook();
  const { modal, handleModal } = useModal();
  const { form, handleForm, verificarPorDocumento, loading, handleRegistro, clearFormRegistroCliente, error } = useRegistroCliente();

  const registar = async () => {
    const res = await handleRegistro();
    if (res == null) {
      return;
    }
    setCliente(res.id, res.razon_social || `${res.nombres} ${res.apellidos}`);
    handleModal("registro");
    clearFormRegistroCliente();
  };

  const cerrar = () => {
    handleModal("registro");
  };

  return (
    <Dialog fullWidth open={modal.registro} onClose={cerrar}>
      <DialogTitle>Registrar cliente</DialogTitle>
      <DialogContent>
        {loading && <LinearProgress />}
        <Grid container spacing={{ xs: 2 }} mt={2}>
          <Grid size={{ xs: 12, md: 12 }}>{error.code > 0 && <Alert severity="error">{error.message}</Alert>}</Grid>
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={registar} disabled={loading}>
          Registrar
        </Button>
        <Button variant="outlined" onClick={cerrar} disabled={loading}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegistroClienteModal;
