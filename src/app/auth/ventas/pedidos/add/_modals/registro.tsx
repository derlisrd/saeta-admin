import { Alert, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid2 as Grid, LinearProgress, TextField } from "@mui/material";
import useHook from "../_hooks/useHook";
import useRegistroCliente from "../_hooks/useRegistroCliente";
import useModal from "../_hooks/useModal";
import Icon from "@/components/ui/icon";
import { useQueryClient } from "@tanstack/react-query";

function RegistroClienteModal() {
  const { setCliente } = useHook();
  const queryCliente = useQueryClient();
  const { modal, handleModal } = useModal();
  const { form, handleForm, verificarPorDocumento, loading, handleRegistro, clearFormRegistroCliente, error } = useRegistroCliente();

  const registar = async () => {
    const res = await handleRegistro();
    if (res == null) {
      return;
    }
    queryCliente.invalidateQueries({ queryKey: ["listaClientes"] });
    setCliente(res.id, res.razon_social || `${res.nombres} ${res.apellidos}`);
    handleModal("registro");
    clearFormRegistroCliente();
  };

  const cerrar = () => handleModal("registro");

  return (
    <Dialog fullWidth open={modal.registro} onClose={cerrar}>
      <DialogTitle>Registrar cliente</DialogTitle>
      <DialogContent>
        <Grid container spacing={{ xs: 2 }}>
          <Grid size={{ xs: 12, md: 12 }}>
            {loading && <LinearProgress />}
            {error.code > 0 && <Alert severity="error">{error.message}</Alert>}
          </Grid>
          <Grid size={12}>
            <FormLabel>Extranjero: </FormLabel>
            <FormControlLabel
              value={0}
              control={<Checkbox icon={<Icon size={22}>circle-dashed</Icon>} checkedIcon={<Icon size={22}>circle-check</Icon>} />}
              checked={form.extranjero === 0}
              onChange={() => handleForm("extranjero", 0)}
              label="Nacional"
            />
            <FormControlLabel
              value={1}
              control={<Checkbox icon={<Icon size={22}>circle-dashed</Icon>} checkedIcon={<Icon size={22}>circle-check</Icon>} />}
              checked={form.extranjero === 1}
              onChange={() => handleForm("extranjero", 1)}
              label="Extranjero"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              label="Documento o RUC"
              fullWidth
              autoFocus
              required
              onBlur={(e) => verificarPorDocumento(e.target.value)}
              value={form.doc}
              onChange={(e) => handleForm("doc", e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField label="Nombres" fullWidth value={form.nombres} onChange={(e) => handleForm("nombres", e.target.value)} disabled={loading} />
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
        <Button startIcon={<Icon>device-floppy</Icon>} onClick={registar} disabled={loading}>
          Guardar
        </Button>
        <Button variant="outlined" onClick={cerrar} disabled={loading}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegistroClienteModal;
