import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress, TextField } from "@mui/material";
import useCategoria from "../useCategoria";
import { useState } from "react";
import { AddCategoria } from "@/services/dto/productos/AddCategoria";

function AddModal() {
  const { handleModal, modals, isPendingAdd, addCategoria } = useCategoria();
  const [form, setForm] = useState<AddCategoria>(
    new AddCategoria({
      nombre: "",
      descripcion: "",
      publicado: 1,
    })
  );

  const createNewCategoria = () => {
    addCategoria(form);
  };

  return (
    <Dialog open={modals.crear} onClose={() => handleModal("crear")}>
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
        <Button disabled={isPendingAdd} onClick={() => handleModal("crear")} variant="outlined">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddModal;
