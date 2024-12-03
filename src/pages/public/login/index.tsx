import { TextField, Stack, Button, Typography, Container, Icon, InputAdornment } from "@mui/material";

function Login() {
  return (
    <Container maxWidth="md">
      <Stack sx={{ height: "100vh", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <Stack gap={2} p={3} boxShadow={3} borderRadius={3} maxWidth={360} width="100%" alignItems="center" sx={{ border: "1px solid gray" }}>
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
          />
          <Button variant="contained" size="large">
            Ingresar
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default Login;
