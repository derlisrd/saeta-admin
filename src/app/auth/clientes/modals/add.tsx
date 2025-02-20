import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress, TextField } from "@mui/material";

import { useState } from "react";

import useCliente from "../useCliente";
import { AddCliente } from "@/services/dto/clientes/AddCliente";

function AddModal() {
  const { handleModal, modals, isPendingAdd, addSubmit } = useCliente();

  const [form, setForm] = useState<AddCliente>({
    nombres: "",
    apellidos: "",
    razon_social: "",
    doc: "",
    extranjero: 0,
    telefono: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={modals.crear} onClose={() => handleModal("crear")}>
      <DialogTitle>Registrar nuevo cliente</DialogTitle>
      <DialogContent>
        {isPendingAdd && <LinearProgress />}
        <Grid container spacing={{ xs: 1, md: 2 }} pt={1}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField disabled={isPendingAdd} fullWidth label="Nombre o Empresa" onChange={handleChange} name="nombres" value={form.nombres} autoFocus autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField disabled={isPendingAdd} fullWidth label="Apellido o Razón social" onChange={handleChange} name="apellidos" value={form.apellidos} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField disabled={isPendingAdd} fullWidth label="Documento" onChange={handleChange} name="doc" value={form.doc} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField disabled={isPendingAdd} fullWidth label="Tel" onChange={handleChange} name="telefono" value={form.telefono} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField disabled={isPendingAdd} fullWidth label="Correo" onChange={handleChange} name="email" value={form.email} autoComplete="off" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isPendingAdd}
          onClick={() => {
            addSubmit(form);
          }}
          variant="contained"
        >
          Registrar
        </Button>
        <Button disabled={isPendingAdd} onClick={() => handleModal("crear")} variant="outlined">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddModal;
