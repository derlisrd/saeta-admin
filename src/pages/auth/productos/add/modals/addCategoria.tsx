import { Dialog, DialogContent, DialogTitle, Grid2 as Grid, TextField, LinearProgress, DialogActions, Button } from "@mui/material";
import useAddProducto from "../_hook/useAddProducto";
import useAddCategoria from "../_hook/useAddCategoria";

function AddCategoriaModal() {
  const { modal, handleModal } = useAddProducto();

  const { form, setForm, isPendingAdd, addCategoria } = useAddCategoria();

  const createNewCategoria = () => {
    addCategoria(form);
    handleModal("categorias");
  };

  return (
    <Dialog open={modal.categorias} onClose={() => handleModal("categorias")}>
      <DialogTitle>Crear categoría</DialogTitle>
      <DialogContent>
        {isPendingAdd && <LinearProgress />}
        <Grid container gap={3} pt={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              disabled={isPendingAdd}
              label="Nombre"
              onChange={({ target }) => {
                setForm({ ...form, nombre: target.value });
              }}
              fullWidth
              autoFocus
              autoComplete="off"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              disabled={isPendingAdd}
              label="Descripción"
              onChange={({ target }) => {
                setForm({ ...form, descripcion: target.value });
              }}
              fullWidth
              autoComplete="off"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={isPendingAdd} onClick={createNewCategoria} variant="contained">
          Crear
        </Button>
        <Button disabled={isPendingAdd} onClick={() => handleModal("categorias")} variant="outlined">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddCategoriaModal;
