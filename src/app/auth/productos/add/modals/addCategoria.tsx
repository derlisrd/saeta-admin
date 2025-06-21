import { Dialog, DialogContent, DialogTitle, Grid2 as Grid, TextField, LinearProgress, DialogActions, Button } from "@mui/material";
import useAddProducto from "../_hook/useAddProducto";
import useAddCategoria from "../_hook/useAddCategoria";
import NotificacionSnack from "@/components/common/NotificacionSnack";
import Icon from "@/components/ui/icon";

function AddCategoriaModal() {
  const { modal, handleModal } = useAddProducto();

  const { form, setForm, isPendingAdd, addCategoria, agregado, setAgregado } = useAddCategoria();

  const createNewCategoria = () => {
    addCategoria(form);
    setForm((pre) => ({ ...pre, nombre: "", descripcion: '' }));
  };
  const close = () => {
    setAgregado(false)
    handleModal("categorias");
  }

  return (<>
    {<NotificacionSnack open={agregado} message="Categoría creada exitosamente" severity="success" onClose={() => setAgregado(false)} />}
    <Dialog open={modal.categorias} onClose={() => handleModal("categorias")}>
      <DialogTitle>Registrar nueva categoría</DialogTitle>
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
              value={form.nombre}
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
              value={form.descripcion}
              fullWidth
              autoComplete="off"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disabled={isPendingAdd} onClick={() => {
          setForm({ ...form, nombre: "", descripcion: "" });
          close()
        }} variant="outlined"
          startIcon={<Icon name="chevrons-left" />}
        >
          Cerrar
        </Button>
        <Button disabled={isPendingAdd} onClick={createNewCategoria} endIcon={<Icon name="device-floppy" />} >
          Guardar
        </Button>

      </DialogActions>
    </Dialog>
  </>
  );
}

export default AddCategoriaModal;
