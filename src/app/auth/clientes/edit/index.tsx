import NotificacionSnack from "@/components/common/NotificacionSnack";
import Icon from "@/components/ui/icon";
import useAddClientes from "@/core/hooks/clientes/useAddCliente";
import { AddCliente } from "@/services/dto/clientes/AddCliente";
import { Box, Breadcrumbs, Button, Container, Grid, LinearProgress, Paper, Slide, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ClientesEdit() {
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
  const clearForm = () => setForm(initialForm);
  const { isLoading, message, addNewCliente, clearMessage } = useAddClientes(clearForm);

  const navigate = useNavigate();

  const submit = async () => addNewCliente(form);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [target.name]: target.value });

  return (
    <Container>
      {message && <NotificacionSnack open message={message.descripcion} title={message.name} severity={message.severity || "info"} onClose={clearMessage} />}
      <Breadcrumbs separator="›">
        <Typography variant="overline">Clientes</Typography>
        <Typography variant="overline">Registrar</Typography>
      </Breadcrumbs>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box component={Paper} elevation={3} p={2} borderRadius={2}>
          <Grid container spacing={{ xs: 1, md: 2 }} pt={1}>
            <Grid size={12}>{isLoading && <LinearProgress />}</Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField disabled={isLoading} required fullWidth label="Documento o ruc" autoFocus onChange={handleChange} name="doc" value={form.doc} autoComplete="off" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField disabled={isLoading} required fullWidth label="Nombre o Empresa" onChange={handleChange} name="nombres" value={form.nombres} autoComplete="off" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField
                disabled={isLoading}
                required
                fullWidth
                label="Apellido o Razón social"
                onChange={handleChange}
                name="apellidos"
                value={form.apellidos}
                autoComplete="off"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField disabled={isLoading} fullWidth label="Tel" onChange={handleChange} name="telefono" value={form.telefono} autoComplete="off" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField disabled={isLoading} fullWidth label="Correo electronico" onChange={handleChange} name="email" value={form.email} autoComplete="off" />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button disabled={isLoading} size="large" startIcon={<Icon name='chevrons-left' />} onClick={() => navigate("/clientes")} variant="outlined">
                  Regresar
                </Button>
                <Button disabled={isLoading} size="large" startIcon={<Icon name='device-floppy' />} onClick={submit} variant="contained">
                  Guardar
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </Container>
  );
}
export default ClientesEdit;
