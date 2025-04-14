import useAddClientes from "@/core/hooks/clientes/useAddCliente";
import { AddCliente } from "@/services/dto/clientes/AddCliente";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ClientesAdd() {
  const { isLoading, error, addNewCliente } = useAddClientes();
  const navigate = useNavigate();
  const initialForm: AddCliente = {
    nombres: "",
    apellidos: "",
    razon_social: "",
    doc: "",
    extranjero: 0,
    telefono: "",
    email: "",
  };
  const [form, setForm] = useState<AddCliente>(initialForm);
  const clear = () => setForm(initialForm);
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [target.name]: target.value });

  return (
    <Dialog open={true} onClose={() => navigate(-1)}>
      <DialogTitle>Registrar nuevo cliente</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error.message}</Alert>}
        <Grid container spacing={{ xs: 1, md: 2 }} pt={1}>
          <Grid size={12}>{isLoading && <LinearProgress />}</Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField disabled={isLoading} fullWidth label="Nombre o Empresa" onChange={handleChange} name="nombres" value={form.nombres} autoFocus autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField disabled={isLoading} fullWidth label="Apellido o Razón social" onChange={handleChange} name="apellidos" value={form.apellidos} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField disabled={isLoading} fullWidth label="Documento" onChange={handleChange} name="doc" value={form.doc} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField disabled={isLoading} fullWidth label="Tel" onChange={handleChange} name="telefono" value={form.telefono} autoComplete="off" />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField disabled={isLoading} fullWidth label="Correo" onChange={handleChange} name="email" value={form.email} autoComplete="off" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={clear} variant="outlined">
          Limpiar
        </Button>
        <Button disabled={isLoading} onClick={() => addNewCliente(form)} variant="contained">
          Registrar
        </Button>
        <Button disabled={isLoading} onClick={() => navigate(-1)} variant="outlined">
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ClientesAdd;
