import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress } from "@mui/material";
import useHook from "../_hooks/useHook";
import FormaPagoSelect from "../_components/formapagoselect";
import useInsertPedido from "../_hooks/useInsertPedido";
import useValidator from "../_hooks/useValidator";

function FinalizarPedido() {
  const { modal, handleModal, pedidos, index, setResult, setError, error } = useHook();
  const { insertPedido, isLoading } = useInsertPedido();
  const { validate } = useValidator();

  const finalizarPedido = async () => {
    const error = validate(pedidos[index]);
    if (error.active) {
      setError(error);
      setResult({ success: false, status: 400, message: error.message, results: null });
      handleModal("error", true);
      return;
    }
    const res = await insertPedido(pedidos[index]);
    if (!res.success) {
      setResult(res);
      handleModal("error", true);
    }

    if (res.success && res.results) {
      setResult(res);
      handleModal("success", true);
    }
  };

  return (
    <Dialog open={modal.finalizar} fullScreen onClose={() => handleModal("finalizar", false)}>
      <DialogTitle>Finalizar Pedido</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={1} pt={1}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormaPagoSelect error={error.name === "formas_pago_id"} />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disabled={isLoading} color="primary" sx={{ p: 2 }} onClick={finalizarPedido}>
          Finalizar pedido
        </Button>
        <Button variant="outlined" disabled={isLoading} color="warning" sx={{ p: 2 }} onClick={() => handleModal("finalizar", false)}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FinalizarPedido;
