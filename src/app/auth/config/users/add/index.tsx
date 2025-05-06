import Icon from "@/components/ui/icon";
import useAddUsers from "@/core/hooks/users/useAddUsers";
import { UserCreateForm } from "@/services/dto/users/user";
import { Box, Button, Container, FormControl, Grid2 as Grid, InputLabel, LinearProgress, MenuItem, Paper, Select, Slide, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUsuario() {
  const { isPending, insertar } = useAddUsers();
  const nav = useNavigate();
  const [form, setForm] = useState<UserCreateForm>(
    new UserCreateForm({
      name: "",
      username: "",
      email: "",
      password: "",
      sucursal_id: 0,
      empresa_id: 0,
    })
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Slide direction="down" unmountOnExit mountOnEnter in>
        <Box boxShadow={4} borderRadius={4} component={Paper} mb={6} padding={{ xs: 0, sm: 1, md: 2 }}>
          <Grid container spacing={3}>
            <Grid size={12}>{isPending && <LinearProgress />}</Grid>
            <Grid size={12}>
              <h3>Agregar un usuario</h3>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField autoFocus label="Nombre" name="name" value={form.name} onChange={handleChange} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField label="Usuario" fullWidth name="username" value={form.username} onChange={handleChange} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <TextField label="Correo electrónico" name="email" value={form.email} onChange={handleChange} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <TextField label="Contraseña" name="password" value={form.password} onChange={handleChange} fullWidth />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Asignar sucursal</InputLabel>

                <Select fullWidth onChange={({}) => {}} label="Forma de pago" name="formas_pago_id">
                  <MenuItem value={0} disabled>
                    Asignar sucursal
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" onClick={() => nav("/config/users")} startIcon={<Icon>arrow-narrow-left-dashed</Icon>}>
                  Regresar
                </Button>
                <Button onClick={() => insertar(form)} startIcon={<Icon>device-floppy</Icon>}>
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

export default AddUsuario;
