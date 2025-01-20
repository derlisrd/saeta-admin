import { Dialog, DialogContent, DialogTitle, Grid2 as Grid } from "@mui/material";
import useHook from "../useHook";

function FinalizarPedido() {
  const { modal, handleModal, pedidos, index, formasPago, changePedido } = useHook();
  return (
    <Dialog open={modal.finalizar} fullScreen onClose={() => handleModal("finalizar", false)}>
      <DialogTitle>Finalizar Pedido</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} pt={1}>
          <Grid size={{ xs: 12, sm: 6 }}></Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default FinalizarPedido;
