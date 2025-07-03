import Icon from "@/components/ui/icon";
import useLogin from "@/core/hooks/login/useLogin";
import { useAuth } from "@/providers/AuthProvider";
import { useConfigContext } from "@/providers/ConfigProvider";
import { TextField, Stack, Button, Typography, Container, InputAdornment, CircularProgress, Alert, IconButton, Link as Enlace, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

function Login() {
  const { handleLogin: submitLogin, isLoading, error, hide, toggleHide } = useLogin();
  const { isLoadingConfig } = useConfigContext();
  const { loading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange', // Valida en tiempo real
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit = async (data: { username: string; password: string; }) => {
    // Aquí llamas a tu función de login existente con los datos validados
    await submitLogin(data);
  };

  return (
    <Container maxWidth="md">
      {isLoading || loading || isLoadingConfig ? (
        <Stack sx={{ height: "100vh", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <CircularProgress />
        </Stack>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack sx={{ height: "95vh", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <Stack gap={3} p={3} boxShadow={5} borderRadius={3} maxWidth={360} width="100%" alignItems="center" sx={{ border: "1px solid #efefef" }}>
              <Typography variant="h5">
                INGRESAR
              </Typography>
              {error.code > 0 && <Alert severity="error">{error.message}</Alert>}

              <Controller
                name="username"
                control={control}
                rules={{
                  required: 'El usuario es requerido',
                  minLength: {
                    value: 3,
                    message: 'El usuario debe tener al menos 3 caracteres'
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9@._-]+$/,
                    message: 'El usuario contiene caracteres no válidos'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon name='user' />
                          </InputAdornment>
                        ),
                      },
                    }}
                    autoFocus
                    variant="outlined"
                    placeholder="Usuario o email"
                    label="Usuario"
                    fullWidth
                    error={!!errors.username}
                    helperText={errors.username?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                  }
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon name='lock' />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={toggleHide}>
                              <Icon name={hide ? `eye-off` : `eye`} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                    variant="outlined"
                    placeholder="Contraseña"
                    label="Contraseña"
                    type={hide ? `password` : `text`}
                    fullWidth
                    id="password_user"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <Button
                variant="contained"
                type="submit"
                size="large"
                disabled={!isValid || isLoading}
              >
                Ingresar
              </Button>

              <Box sx={{ width: '100%', textAlign: 'right' }}>
                <Enlace component={Link} to="/recuperar" color="primary">
                  Recuperar mi contraseña
                </Enlace>
              </Box>
            </Stack>
          </Stack>
        </form>
      )}
    </Container>
  );
}

export default Login;