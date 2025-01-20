import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, TextField } from "@mui/material";
import useHook from "../useHook";

function ClientesModal() {
  const { modal, handleModal } = useHook();

  const options = [
    { label: "The Godfather", id: 1 },
    { label: "Pulp Fiction", id: 2 },
  ];
  return (
    <Dialog fullWidth open={modal.clientes} onClose={() => handleModal("clientes", false)}>
      <DialogTitle>Clientes</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} pt={1}>
          <Grid size={12}>
            <Autocomplete options={options} renderInput={(params) => <TextField {...params} label="Movie" />} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => handleModal("clientes", false)}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClientesModal;
