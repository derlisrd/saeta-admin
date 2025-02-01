import { Button, Container, Stack } from "@mui/material";

function Clientes() {
  return (
    <Container sx={{ paddingBottom: 6 }}>
      <Stack direction={{ xs: "row" }} justifyContent="space-between" alignItems="center" padding={2}>
        <h3>Clientes</h3>
        <Button onClick={() => {}}>Agregar nuevo</Button>
      </Stack>
    </Container>
  );
}

export default Clientes;
