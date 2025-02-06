import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, TextField } from "@mui/material";
import useHook from "../_hooks/useHook";
import useBuscarCliente from "../_hooks/useBuscarCliente";
import useModal from "../_hooks/useModal";

function ClientesModal() {
  const { setCliente } = useHook();
  const { listaBusqueda, isLoading, setQ } = useBuscarCliente();
  const { modal, handleModal } = useModal();

  const setChangeValue = (value: { label: string; id: number }) => {
    setCliente(value.id, value.label);
    handleModal("clientes");
  };
  return (
    <Dialog fullWidth open={modal.clientes} onClose={() => handleModal("clientes")}>
      <DialogTitle>Buscar clientes</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} pt={1}>
          <Grid size={12}>
            <Autocomplete
              onChange={(_, value) => {
                setChangeValue({ label: value?.label || "", id: value?.id || 0 });
              }}
              options={listaBusqueda}
              loading={isLoading}
              loadingText="Buscando..."
              noOptionsText="No se encontraron resultados"
              renderInput={(params) => <TextField {...params} placeholder="Buscar cliente..." autoFocus onChange={(e) => e.target.value && setQ(e.target.value)} />}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            handleModal("clientes");
            handleModal("registro");
          }}
        >
          Registrar nuevo
        </Button>
        <Button variant="outlined" onClick={() => handleModal("clientes")}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClientesModal;
