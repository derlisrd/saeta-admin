import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, TextField } from "@mui/material";
import useHook from "../_hooks/useHook";
import useBuscarCliente from "../_hooks/useBuscarCliente";

function ClientesModal() {
  const { modal, handleModal } = useHook();
  const { listaBusqueda, buscarCliente } = useBuscarCliente();

  return (
    <Dialog fullWidth open={modal.clientes} onClose={() => handleModal("clientes", false)}>
      <DialogTitle>Buscar clientes</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} pt={1}>
          <Grid size={12}>
            <Autocomplete
              options={listaBusqueda}
              renderInput={(params) => <TextField {...params} placeholder="Buscar cliente..." autoFocus onChange={(e) => e.target.value && buscarCliente(e.target.value)} />}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleModal("registro", false)}>
          Registrar nuevo
        </Button>
        <Button variant="outlined" onClick={() => handleModal("clientes", false)}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClientesModal;
