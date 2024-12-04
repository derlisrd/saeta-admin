import useLogin from "@/core/hooks/login/useLogin";
import { TextField, Stack, Button, Typography, Container, Icon, InputAdornment, CircularProgress } from "@mui/material";

function Login() {
  const { username, setUsername, password, setPassword, handleLogin, isLoading } = useLogin();
  return (
    <Container maxWidth="md">
      {isLoading ? (
        <Stack sx={{ height: "100vh", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <CircularProgress />
        </Stack>
      ) : (
        <Stack sx={{ height: "100vh", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <Stack gap={2} p={3} boxShadow={3} borderRadius={3} maxWidth={360} width="100%" alignItems="center" sx={{ border: "1px solid #cecece" }}>
            <Typography variant="button" fontSize={20}>
              INGRESAR
            </Typography>
            <TextField
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>person</Icon>
                    </InputAdornment>
                  ),
                },
              }}
              autoFocus
              required
              variant="outlined"
              placeholder="Usuario o email"
              label="Usuario"
              fullWidth
              onChange={({ target }) => {
                setUsername(target.value);
              }}
              value={username}
            />
            <TextField
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Icon>lock</Icon>
                    </InputAdornment>
                  ),
                },
              }}
              variant="outlined"
              placeholder="Contraseña"
              label="Contraseña"
              type="password"
              fullWidth
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              onKeyUp={({ key }) => {
                key === "Enter" && handleLogin();
              }}
              value={password}
            />
            <Button variant="contained" size="large" onClick={handleLogin}>
              Ingresar
            </Button>
          </Stack>
        </Stack>
      )}
    </Container>
  );
}

export default Login;
