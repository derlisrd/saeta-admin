import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, TextField } from "@mui/material";
import useCategoria from "../useCategoria";

function AddModal() {
  const { handleModal, modals } = useCategoria();
  return (
    <Dialog open={modals.crear} onClose={() => handleModal("crear")}>
      <DialogTitle>Crear categoría</DialogTitle>
      <DialogContent>
        <Grid container gap={3} pt={2}>
          <Grid size={{ xs: 12 }}>
            <TextField label="Nombre" fullWidth autoFocus autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField label="Descripción" fullWidth autoComplete="off" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleModal("crear")} variant="contained">
          Crear
        </Button>
        <Button onClick={() => handleModal("crear")} variant="outlined">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddModal;
