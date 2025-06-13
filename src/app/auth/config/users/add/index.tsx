import Icon from "@/components/ui/icon";
import useSucursales from "@/core/hooks/sucursales/useSucursales";
import useAddUsers from "@/core/hooks/users/useAddUsers";
import { UserCreateForm } from "@/services/dto/users/user";
import { Box, Breadcrumbs, Button, Container, FormControl, FormHelperText, Grid2 as Grid, InputLabel, LinearProgress, MenuItem, Paper, Select, Slide, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import NotificacionSnack from "@/components/common/NotificacionSnack";

function AddUsuario() {
  const { isPending, insertar, message, clearMessage } = useAddUsers();
  const { listaSucursales, isLoading } = useSucursales();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserCreateForm>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      sucursal_id: 0,
      empresa_id: 0,
    },
    mode: "onBlur", // Validar al perder el foco
  });
  const nav = useNavigate();
  const onSubmit = async (data: UserCreateForm) => {
    const success = await insertar(data); // Asume que insertar ahora retorna una promesa que resuelve con un booleano
    if (success) {
      reset({ // Llama a la función reset para limpiar el formulario
        name: "",
        username: "",
        email: "",
        password: "",
        sucursal_id: 0,
        empresa_id: 0,
      });
    }
  }

  return (
    <Container>
      {message && <NotificacionSnack open message={message.descripcion} title={message.name} severity={message.severity || "info"} onClose={clearMessage} />}
      <Slide direction="down" unmountOnExit mountOnEnter in>
        <Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h6">Agregar usuario</Typography>
              <Breadcrumbs separator="›">
                <Typography variant="overline">Usuarios</Typography>
                <Typography variant="overline">Agregar</Typography>
              </Breadcrumbs>
              {isPending || isLoading ? <LinearProgress /> : null}
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box boxShadow={4} justifyContent='center' alignItems='center' display='flex' borderRadius={4} component={Paper} mb={6} padding={2}>
                <Box display='flex' gap={4} padding={2} flexDirection='column' alignItems='center'
                  onClick={() => document.getElementById("file-input")?.click()}
                  sx={{ cursor: "pointer" }} borderRadius={4} bgcolor='background.default'>
                  <Icon size={64} name='photo-plus' />
                  <input type="file" hidden id="file-input" />
                  <Typography variant="body2" color="textSecondary">
                    Permitido *.jpeg, *.jpg, *.png, *.gif
                    max de 3 Mb
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box boxShadow={4} borderRadius={4} component={Paper} mb={6} padding={{ xs: 1, md: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <Controller
                        name="name"
                        control={control}
                        rules={{
                          required: "El nombre es obligatorio",
                        }}
                        render={({ field }) => <TextField {...field} autoFocus label="Nombre" fullWidth error={!!errors.name} helperText={errors.name?.message} />}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <Controller
                        name="username"
                        control={control}
                        rules={{
                          required: "El username es obligatorio",
                        }}
                        render={({ field }) => <TextField {...field} label="Usuario" fullWidth error={!!errors.username} helperText={errors.username?.message} />}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "El correo electrónico es obligatorio",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Ingrese un correo electrónico válido",
                          },
                        }}
                        render={({ field }) => <TextField {...field} label="Correo electrónico" fullWidth error={!!errors.email} helperText={errors.email?.message} />}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                      <Controller
                        name="password"
                        control={control}
                        rules={{
                          required: "La contraseña es obligatoria",
                          minLength: {
                            value: 6,
                            message: "La contraseña debe tener al menos 6 caracteres",
                          },
                        }}
                        render={({ field }) => <TextField {...field} type="password" label="Contraseña" fullWidth error={!!errors.password} helperText={errors.password?.message} />}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                      <Controller
                        name="sucursal_id"
                        control={control}
                        rules={{
                          validate: (value) => value > 0 || "Debe seleccionar una sucursal",
                        }}
                        render={({ field }) => (
                          <FormControl fullWidth error={!!errors.sucursal_id}>
                            <InputLabel>Asignar sucursal</InputLabel>
                            <Select label="Asignar sucursal" value={field.value.toString()} onChange={(e) => field.onChange(Number(e.target.value))} onBlur={field.onBlur}>
                              <MenuItem value="0" disabled>
                                Asignar sucursal
                              </MenuItem>
                              {listaSucursales?.map((sucursal) => (
                                <MenuItem key={sucursal.id} value={sucursal.id.toString()}>
                                  {sucursal.nombre}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.sucursal_id && <FormHelperText>{errors.sucursal_id.message}</FormHelperText>}
                          </FormControl>
                        )}
                      />
                    </Grid>

                    <Grid size={12}>
                      <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={() => nav("/config/users")} startIcon={<Icon name='arrow-narrow-left-dashed' />}>
                          Regresar
                        </Button>
                        <Button type="submit" variant="contained" startIcon={<Icon name='device-floppy' />}>
                          Guardar
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Slide>
    </Container>
  );
}

export default AddUsuario;
