import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid2 as Grid, LinearProgress } from "@mui/material";
import useHook from "../_hooks/useHook";
import FormaPagoSelect from "../_components/formapagoselect";
import useInsertPedido from "../_hooks/useInsertPedido";
import useValidator from "../_hooks/useValidator";
import EntregadoCheck from "../_components/entregadocheck";
import useModal from "../_hooks/useModal";

function FinalizarPedido() {
  const { pedidos, index, setResult, setError, error } = useHook();
  const { modal, handleModal } = useModal();
  const { insertPedido, isLoading } = useInsertPedido();
  const { validate } = useValidator();

  const finalizarPedido = async () => {
    const validateError = validate(pedidos[index]);

    if (validateError.active) {
      setError(validateError);
      setResult({ success: false, status: 400, message: validateError.message, results: null });
      handleModal("error");
      return;
    }
    const res = await insertPedido(pedidos[index]);
    if (!res.success) {
      setResult(res);
      handleModal("error");
    }

    if (res.success && res.results) {
      setResult(res);
      handleModal("success");
    }
  };

  return (
    <Dialog open={modal.finalizar} fullScreen onClose={() => handleModal("finalizar")}>
      <DialogTitle>Finalizar Pedido</DialogTitle>
      <DialogContent>
        {isLoading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={2} pt={1}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormaPagoSelect error={error.code === 3} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <EntregadoCheck />
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" disabled={isLoading} color="primary" sx={{ p: 2 }} onClick={finalizarPedido}>
          Finalizar pedido
        </Button>
        <Button variant="outlined" disabled={isLoading} color="warning" sx={{ p: 2 }} onClick={() => handleModal("finalizar")}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default FinalizarPedido;
