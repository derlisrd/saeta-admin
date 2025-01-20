import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid } from "@mui/material";
import useHook from "../useHook";
import FormaPagoSelect from "../_components/formapagoselect";

function FinalizarPedido() {
  const { modal, handleModal } = useHook();
  return (
    <Dialog open={modal.finalizar} fullScreen onClose={() => handleModal("finalizar", false)}>
      <DialogTitle>Finalizar Pedido</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} pt={1}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormaPagoSelect />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" sx={{ p: 2 }} onClick={() => handleModal("finalizar", false)}>
          Finalizar pedido
        </Button>
        <Button variant="outlined" color="warning" sx={{ p: 2 }} onClick={() => handleModal("finalizar", false)}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FinalizarPedido;
