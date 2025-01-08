import { Container, Dialog, DialogContent } from "@mui/material";

function AddPedido() {
  return (
    <Dialog open={true} fullScreen>
      <DialogContent>
        <Container>
          <h1>Agregar Pedido</h1>
        </Container>
      </DialogContent>
    </Dialog>
  );
}

export default AddPedido;
